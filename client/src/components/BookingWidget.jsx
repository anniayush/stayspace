import { useMemo, useState } from "react";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

const getRazorpayKeyId = (serverKeyId) =>
  serverKeyId || import.meta.env.VITE_RAZORPAY_KEY_ID || "";

const formatCurrency = (amount) => `Rs${amount}`;

const BookingWidget = ({ listing }) => {
  const { user } = useAuth();
  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    guests: 1,
    reservationName: "",
    reservationAge: ""
  });
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const nights = useMemo(() => {
    if (!form.startDate || !form.endDate) {
      return 0;
    }

    const start = new Date(form.startDate);
    const end = new Date(form.endDate);
    return Math.max(Math.ceil((end - start) / (1000 * 60 * 60 * 24)), 0);
  }, [form.endDate, form.startDate]);

  const cleaningFee = listing.priceDetails?.cleaningFee || 0;
  const serviceFee = listing.priceDetails?.serviceFee || 0;
  const subtotal = nights * listing.pricePerNight;
  const total = subtotal + cleaningFee + serviceFee;

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
    setStatus("");
    setError("");
  };

  const handlePaymentSuccess = async ({
    razorpay_order_id: razorpayOrderId,
    razorpay_payment_id: razorpayPaymentId,
    razorpay_signature: razorpaySignature
  }) => {
    await api.post("/bookings", {
      listingId: listing._id,
      startDate: form.startDate,
      endDate: form.endDate,
      guests: Number(form.guests),
      reservationName: form.reservationName.trim(),
      reservationAge: Number(form.reservationAge),
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature
    });
    setStatus("Booking confirmed. Your trip has been saved.");
  };

  const handleReserve = async () => {
    setError("");
    setStatus("");
    setSubmitting(true);

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error("Razorpay checkout failed to load");
      }

      const { data } = await api.post("/bookings/order", {
        listingId: listing._id,
        startDate: form.startDate,
        endDate: form.endDate,
        guests: Number(form.guests),
        reservationName: form.reservationName.trim(),
        reservationAge: Number(form.reservationAge)
      });

      const keyId = getRazorpayKeyId(data.keyId);
      if (!keyId) {
        throw new Error("Razorpay key is missing");
      }

      const razorpay = new window.Razorpay({
        key: keyId,
        amount: data.amount * 100,
        currency: data.currency,
        name: "StaySpace",
        description: `${listing.title} booking payment`,
        order_id: data.orderId,
        handler: async (response) => {
          try {
            await handlePaymentSuccess(response);
          } catch (verificationError) {
            setError(
              verificationError.response?.data?.message || "Payment verification failed"
            );
          }
        },
        prefill: {
          name: form.reservationName || user.name,
          email: user.email
        },
        notes: {
          listingId: listing._id,
          guests: String(form.guests),
          reservationName: form.reservationName,
          reservationAge: String(form.reservationAge)
        },
        theme: {
          color: "#1f6b52"
        },
        modal: {
          ondismiss: () => {
            setSubmitting(false);
          }
        }
      });

      razorpay.open();
    } catch (requestError) {
      setError(
        requestError.response?.data?.message ||
          requestError.message ||
          "Unable to start payment. Check Razorpay and dates."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <aside className="panel booking-widget">
        <h3>{formatCurrency(listing.pricePerNight)} night</h3>
        <p>Login to reserve and pay securely.</p>
      </aside>
    );
  }

  return (
    <aside className="panel booking-widget">
      <h3>{formatCurrency(listing.pricePerNight)} night</h3>
      <label>
        Check in
        <input name="startDate" onChange={handleChange} required type="date" value={form.startDate} />
      </label>
      <label>
        Check out
        <input name="endDate" onChange={handleChange} required type="date" value={form.endDate} />
      </label>
      <div className="booking-widget__guest-grid">
        <label>
          Guests
          <input
            max={listing.guests}
            min="1"
            name="guests"
            onChange={handleChange}
            type="number"
            value={form.guests}
          />
        </label>
        <label className="booking-widget__name-field">
          Reservation name
          <input
            name="reservationName"
            onChange={handleChange}
            placeholder="Full name for reservation"
            required
            type="text"
            value={form.reservationName}
          />
        </label>
        <label>
          Reservation age
          <input
            min="0"
            name="reservationAge"
            onChange={handleChange}
            placeholder="Age"
            required
            type="number"
            value={form.reservationAge}
          />
        </label>
      </div>
      <p className="price-summary">
        {formatCurrency(listing.pricePerNight)} x {nights || 0} night(s)
      </p>
      <div className="fee-breakdown">
        <p>Stay subtotal: {formatCurrency(subtotal || 0)}</p>
        <p>Cleaning fee: {formatCurrency(cleaningFee)}</p>
        <p>Service fee: {formatCurrency(serviceFee)}</p>
        <p className="fee-breakdown__total">Total: {formatCurrency(total || 0)}</p>
      </div>
      <button
        className="primary-button"
        disabled={submitting || !nights}
        onClick={handleReserve}
        type="button"
      >
        {submitting ? "Opening payment..." : "Reserve"}
      </button>
      <p className="booking-note">
        Secure payment for {form.guests} guest(s), reserved under {form.reservationName || "your name"}.
      </p>
      {status ? <p className="form-success">{status}</p> : null}
      {error ? <p className="form-error">{error}</p> : null}
    </aside>
  );
};

export default BookingWidget;
