import express from "express";
import {
  getMyNotifications,
  markAllNotificationsRead
} from "../controllers/notificationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect);
router.get("/mine", getMyNotifications);
router.patch("/read-all", markAllNotificationsRead);

export default router;
