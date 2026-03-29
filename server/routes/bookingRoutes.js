import express from "express";
import {
  createOrder,
  getMyBookings,
  verifyPaymentAndCreateBooking
} from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.get("/mine", getMyBookings);
router.post("/", verifyPaymentAndCreateBooking);
router.post("/order", createOrder);

export default router;
