import mongoose from "mongoose";

const hostSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    isSuperhost: { type: Boolean, default: false },
    joinedYear: { type: Number, required: true },
    avatar: { type: String, default: "" }
  },
  { _id: false }
);

const addressSchema = new mongoose.Schema(
  {
    street: { type: String, required: true, trim: true },
    city: { type: String, required: true, trim: true },
    state: { type: String, default: "", trim: true },
    postalCode: { type: String, default: "", trim: true }
  },
  { _id: false }
);

const priceDetailsSchema = new mongoose.Schema(
  {
    cleaningFee: { type: Number, default: 0 },
    serviceFee: { type: Number, default: 0 }
  },
  { _id: false }
);

const listingSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    location: {
      type: String,
      required: true,
      trim: true
    },
    country: {
      type: String,
      required: true,
      trim: true
    },
    pricePerNight: {
      type: Number,
      required: true
    },
    rating: {
      type: Number,
      default: 4.8
    },
    image: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    guests: {
      type: Number,
      default: 2
    },
    bedrooms: {
      type: Number,
      default: 1
    },
    baths: {
      type: Number,
      default: 1
    },
    amenities: {
      type: [String],
      default: []
    },
    category: {
      type: String,
      default: "Stay"
    },
    host: {
      type: hostSchema,
      required: true
    },
    address: {
      type: addressSchema,
      required: true
    },
    highlights: {
      type: [String],
      default: []
    },
    houseRules: {
      type: [String],
      default: []
    },
    priceDetails: {
      type: priceDetailsSchema,
      default: () => ({})
    }
  },
  { timestamps: true }
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
