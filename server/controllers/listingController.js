import Listing from "../models/Listing.js";

export const getListings = async (req, res) => {
  try {
    const { search = "", category = "" } = req.query;
    const query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { country: { $regex: search, $options: "i" } }
      ];
    }

    if (category) {
      query.category = category;
    }

    const listings = await Listing.find(query).sort({ createdAt: -1 });
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getListingMeta = async (_req, res) => {
  try {
    const [categories, totalListings] = await Promise.all([
      Listing.distinct("category"),
      Listing.countDocuments()
    ]);

    res.json({
      totalListings,
      categories: categories.sort((left, right) => left.localeCompare(right))
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
