import crypto from "crypto";
import Booking from "../models/Booking.js";
import Listing from "../models/Listing.js";

const getNightCount = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diff = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  return diff > 0 ? diff : 0;
};

const getBookingTotal = (listing, nights) =>
  nights * listing.pricePerNight +
  (listing.priceDetails?.cleaningFee || 0) +
  (listing.priceDetails?.serviceFee || 0);

const getResolvedBookingStatus = (booking) => {
  if (booking.bookingStatus === "cancelled") {
    return "cancelled";
  }

  if (booking.endDate && new Date(booking.endDate) < new Date()) {
    return "done";
  }

  return booking.bookingStatus || "pending";
};

const createRazorpayOrder = async ({ amount, receipt, notes }) => {
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_KEY_SECRET;

  if (
    !keyId ||
    !keySecret ||
    keyId === "rzp_test_replace_me" ||
    keySecret === "replace-with-your-razorpay-secret"
  ) {
    throw new Error("Razorpay is not configured");
  }

  const response = await fetch("https://api.razorpay.com/v1/orders", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${keyId}:${keySecret}`).toString("base64")}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      amount,
      currency: "INR",
      receipt,
      notes
    })
  });

  const payload = await response.json();

  if (!response.ok) {
    throw new Error(payload.error?.description || "Failed to create Razorpay order");
  }

  return payload;
};

export const createOrder = async (req, res) => {
  try {
    const { listingId, startDate, endDate, guests, reservationName, reservationAge } = req.body;

    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    const nights = getNightCount(startDate, endDate);
    if (!nights) {
      return res.status(400).json({ message: "Dates are invalid" });
    }

    if (!reservationName?.trim()) {
      return res.status(400).json({ message: "Reservation name is required" });
    }

    if (!Number.isFinite(Number(reservationAge)) || Number(reservationAge) < 0) {
      return res.status(400).json({ message: "Reservation age is invalid" });
    }

    const amount = getBookingTotal(listing, nights) * 100;
    const order = await createRazorpayOrder({
      amount,
      receipt: `booking_${Date.now()}`,
      notes: {
        listingId,
        guests: String(guests),
        nights: String(nights),
        reservationName: reservationName.trim(),
        reservationAge: String(reservationAge),
        userId: String(req.user._id)
      }
    });

    res.json({
      orderId: order.id,
      currency: order.currency,
      amount: amount / 100,
      nights,
      keyId: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyPaymentAndCreateBooking = async (req, res) => {
  try {
    const {
      listingId,
      startDate,
      endDate,
      guests,
      reservationName,
      reservationAge,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature
    } = req.body;

    const listing = await Listing.findById(listingId);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    const nights = getNightCount(startDate, endDate);
    if (!nights) {
      return res.status(400).json({ message: "Dates are invalid" });
    }

    if (!reservationName?.trim()) {
      return res.status(400).json({ message: "Reservation name is required" });
    }

    if (!Number.isFinite(Number(reservationAge)) || Number(reservationAge) < 0) {
      return res.status(400).json({ message: "Reservation age is invalid" });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      return res.status(500).json({ message: "Razorpay is not configured" });
    }

    const expectedSignature = crypto
      .createHmac("sha256", secret)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");

    if (expectedSignature !== razorpaySignature) {
      return res.status(400).json({ message: "Payment verification failed" });
    }

    const booking = await Booking.create({
      user: req.user._id,
      listing: listing._id,
      startDate,
      endDate,
      guests,
      reservationName: reservationName.trim(),
      reservationAge: Number(reservationAge),
      nights,
      totalPrice: getBookingTotal(listing, nights),
      bookingStatus: "confirmed",
      paymentStatus: "paid",
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature
    });

    const populatedBooking = await booking.populate("listing");
    res.status(201).json(populatedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate("listing")
      .sort({ createdAt: -1 });

    res.json(
      bookings.map((booking) => ({
        ...booking.toObject(),
        currentStatus: getResolvedBookingStatus(booking)
      }))
    );
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
