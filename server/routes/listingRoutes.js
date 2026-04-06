import express from "express";
import {
  getListingById,
  getListingMeta,
  getListings
} from "../controllers/listingController.js";

const router = express.Router();

router.get("/meta", getListingMeta);
router.get("/", getListings);
router.get("/:id", getListingById);

export default router;
