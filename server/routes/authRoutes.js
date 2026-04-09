import express from "express";
import {
  forgotPassword,
  getProfile,
  getWishlist,
  loginUser,
  logoutUser,
  resetPassword,
  toggleFavorite,
  registerUser
} from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.post("/logout", logoutUser);
router.get("/me", protect, getProfile);
router.get("/wishlist", protect, getWishlist);
router.post("/favorites/:listingId", protect, toggleFavorite);

export default router;
