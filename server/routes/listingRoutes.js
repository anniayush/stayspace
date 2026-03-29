import express from "express";
import {
  getListingById,
  getListings
} from "../controllers/listingController.js";

const router = express.Router();

router.get("/", getListings);
router.get("/:id", getListingById);

export default router;
