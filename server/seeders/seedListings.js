import dotenv from "dotenv";
import { connectDB } from "../config/db.js";
import Listing from "../models/Listing.js";

dotenv.config();

const listingImage = (filename) => `/images/listings/${filename}`;
const hostAvatar = (filename) => `/images/hosts/${filename}`;

const sampleListings = [
  {
    title: "Lakeview Palace Retreat",
    location: "Udaipur",
    country: "India",
    pricePerNight: 180,
    rating: 4.94,
    image: listingImage("lakeview-palace-retreat.jpg"),
    description: "A heritage-inspired villa with lake views, arches, and a private courtyard.",
    guests: 5,
    bedrooms: 2,
    baths: 2,
    amenities: ["Lake view", "Breakfast", "Air conditioning", "Wi-Fi"],
    category: "Heritage",
    host: {
      name: "Aarav",
      isSuperhost: true,
      joinedYear: 2018,
      avatar: hostAvatar("host-aarav.jpg")
    },
    address: {
      street: "12 Lake Palace Road",
      city: "Udaipur",
      state: "Rajasthan",
      postalCode: "313001"
    },
    highlights: ["Private courtyard", "Handcrafted decor", "Sunrise terrace"],
    houseRules: ["No smoking", "No parties", "Check-in after 2 PM"],
    priceDetails: {
      cleaningFee: 24,
      serviceFee: 18
    }
  },
  {
    title: "Goa Palm Beach Villa",
    location: "Goa",
    country: "India",
    pricePerNight: 220,
    rating: 4.93,
    image: listingImage("goa-palm-beach-villa.jpg"),
    description: "A breezy beach villa near the shoreline with tropical interiors and a private plunge pool.",
    guests: 6,
    bedrooms: 3,
    baths: 3,
    amenities: ["Beach access", "Private pool", "Wi-Fi", "Breakfast"],
    category: "Beach",
    host: {
      name: "Rhea",
      isSuperhost: true,
      joinedYear: 2019,
      avatar: hostAvatar("host-rhea.jpg")
    },
    address: {
      street: "14 Candolim Shore Road",
      city: "Goa",
      state: "Goa",
      postalCode: "403515"
    },
    highlights: ["Walk to beach", "Palm garden lounge", "Sunset rooftop deck"],
    houseRules: ["No parties", "No smoking indoors", "Check-in after 1 PM"],
    priceDetails: {
      cleaningFee: 28,
      serviceFee: 19
    }
  },
  {
    title: "Skyline Loft Bengaluru",
    location: "Bengaluru",
    country: "India",
    pricePerNight: 145,
    rating: 4.87,
    image: listingImage("skyline-loft-bengaluru.jpg"),
    description: "A sharp city apartment with workspace setup, skyline balcony, and quick access to cafes.",
    guests: 3,
    bedrooms: 1,
    baths: 1,
    amenities: ["Workspace", "High-speed Wi-Fi", "Balcony", "Self check-in"],
    category: "City",
    host: {
      name: "Kunal",
      isSuperhost: false,
      joinedYear: 2021,
      avatar: hostAvatar("host-aarav.jpg")
    },
    address: {
      street: "9 Indiranagar 100 Feet Road",
      city: "Bengaluru",
      state: "Karnataka",
      postalCode: "560038"
    },
    highlights: ["Walkable neighborhood", "Dedicated desk", "Fast airport access"],
    houseRules: ["No smoking", "No loud music after 10 PM", "Government ID required"],
    priceDetails: {
      cleaningFee: 16,
      serviceFee: 12
    }
  },
  {
    title: "Cedar Mist Cottage",
    location: "Manali",
    country: "India",
    pricePerNight: 175,
    rating: 4.95,
    image: listingImage("cedar-mist-cottage.jpg"),
    description: "A cozy hill-station cottage with cedar interiors, valley views, and a stone fireplace.",
    guests: 5,
    bedrooms: 2,
    baths: 2,
    amenities: ["Mountain view", "Fireplace", "Garden", "Heater"],
    category: "Hillstation",
    host: {
      name: "Meera",
      isSuperhost: true,
      joinedYear: 2017,
      avatar: hostAvatar("host-meera.jpg")
    },
    address: {
      street: "27 Old Manali Ridge",
      city: "Manali",
      state: "Himachal Pradesh",
      postalCode: "175131"
    },
    highlights: ["Snow valley views", "Bonfire corner", "Apple orchard trail"],
    houseRules: ["No smoking", "No parties", "Pets allowed on request"],
    priceDetails: {
      cleaningFee: 22,
      serviceFee: 15
    }
  },
  {
    title: "Marine Drive Sky Apartment",
    location: "Mumbai",
    country: "India",
    pricePerNight: 190,
    rating: 4.86,
    image: listingImage("marine-drive-sky-apartment.jpg"),
    description: "A polished sea-facing apartment with city lights, compact luxury, and instant cab access.",
    guests: 4,
    bedrooms: 2,
    baths: 2,
    amenities: ["Sea view", "Elevator", "Wi-Fi", "Workspace"],
    category: "City",
    host: {
      name: "Ishaan",
      isSuperhost: true,
      joinedYear: 2018,
      avatar: hostAvatar("host-aarav.jpg")
    },
    address: {
      street: "31 Marine Drive",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400020"
    },
    highlights: ["Arabian Sea views", "Central location", "Designer interiors"],
    houseRules: ["No parties", "No smoking", "Quiet hours after 11 PM"],
    priceDetails: {
      cleaningFee: 18,
      serviceFee: 14
    }
  },
  {
    title: "Tea Garden Ridge House",
    location: "Munnar",
    country: "India",
    pricePerNight: 165,
    rating: 4.92,
    image: listingImage("tea-garden-ridge-house.jpg"),
    description: "A misty hill retreat wrapped by tea estates with wide decks and cool mountain air.",
    guests: 5,
    bedrooms: 2,
    baths: 2,
    amenities: ["Mountain view", "Garden", "Bonfire", "Breakfast"],
    category: "Hillstation",
    host: {
      name: "Anaya",
      isSuperhost: true,
      joinedYear: 2020,
      avatar: hostAvatar("host-anaya.jpg")
    },
    address: {
      street: "18 Tea Valley Road",
      city: "Munnar",
      state: "Kerala",
      postalCode: "685612"
    },
    highlights: ["Tea estate walks", "Valley sunrise deck", "Rainforest air"],
    houseRules: ["No smoking indoors", "No loud music", "Check-in after 2 PM"],
    priceDetails: {
      cleaningFee: 20,
      serviceFee: 13
    }
  },
  {
    title: "Cliffside Cove Villa",
    location: "Varkala",
    country: "India",
    pricePerNight: 205,
    rating: 4.9,
    image: listingImage("cliffside-cove-villa.jpg"),
    description: "A beach hideaway above the cliff with surf access, palm shade, and a breezy open-plan lounge.",
    guests: 4,
    bedrooms: 2,
    baths: 2,
    amenities: ["Beach access", "Surf nearby", "Private patio", "Wi-Fi"],
    category: "Beach",
    host: {
      name: "Nikhil",
      isSuperhost: false,
      joinedYear: 2021,
      avatar: hostAvatar("host-nikhil.jpg")
    },
    address: {
      street: "6 North Cliff Path",
      city: "Varkala",
      state: "Kerala",
      postalCode: "695141"
    },
    highlights: ["Cliff panorama", "Walk to cafes", "Outdoor shower"],
    houseRules: ["No parties", "No smoking indoors", "Pets on request"],
    priceDetails: {
      cleaningFee: 24,
      serviceFee: 17
    }
  },
  {
    title: "Pine Crest A-Frame",
    location: "Nainital",
    country: "India",
    pricePerNight: 185,
    rating: 4.94,
    image: listingImage("pine-crest-a-frame.jpg"),
    description: "A timber A-frame in the pines with lake views, a reading loft, and crisp hill mornings.",
    guests: 4,
    bedrooms: 2,
    baths: 2,
    amenities: ["Lake view", "Fireplace", "Heater", "Self check-in"],
    category: "Cabin",
    host: {
      name: "Tara",
      isSuperhost: true,
      joinedYear: 2019,
      avatar: hostAvatar("host-meera.jpg")
    },
    address: {
      street: "11 Cedar Trail",
      city: "Nainital",
      state: "Uttarakhand",
      postalCode: "263001"
    },
    highlights: ["A-frame architecture", "Forest silence", "Lake walk access"],
    houseRules: ["No smoking", "No parties", "Keep noise low after 9 PM"],
    priceDetails: {
      cleaningFee: 21,
      serviceFee: 16
    }
  },
  {
    title: "Royal Courtyard Haveli",
    location: "Jaipur",
    country: "India",
    pricePerNight: 230,
    rating: 4.91,
    image: listingImage("royal-courtyard-haveli.jpg"),
    description: "A restored haveli stay with carved arches, rooftop dining, and old-city atmosphere.",
    guests: 6,
    bedrooms: 3,
    baths: 3,
    amenities: ["Rooftop dining", "Breakfast", "Air conditioning", "Courtyard"],
    category: "Heritage",
    host: {
      name: "Dev",
      isSuperhost: true,
      joinedYear: 2016,
      avatar: hostAvatar("host-aarav.jpg")
    },
    address: {
      street: "52 Johari Bazaar Lane",
      city: "Jaipur",
      state: "Rajasthan",
      postalCode: "302003"
    },
    highlights: ["Restored architecture", "Old city access", "Private rooftop dinner"],
    houseRules: ["No smoking indoors", "No outside guests", "Check-out before noon"],
    priceDetails: {
      cleaningFee: 26,
      serviceFee: 19
    }
  },
  {
    title: "Minimal Dunes House",
    location: "Jaisalmer",
    country: "India",
    pricePerNight: 170,
    rating: 4.88,
    image: listingImage("desert-design-retreat.jpg"),
    description: "A clean-lined desert stay with sandstone tones, a plunge pool, and stargazing terraces.",
    guests: 4,
    bedrooms: 2,
    baths: 2,
    amenities: ["Plunge pool", "Terrace", "Wi-Fi", "Breakfast"],
    category: "Design",
    host: {
      name: "Farah",
      isSuperhost: false,
      joinedYear: 2022,
      avatar: hostAvatar("host-farah.jpg")
    },
    address: {
      street: "8 Fort View Road",
      city: "Jaisalmer",
      state: "Rajasthan",
      postalCode: "345001"
    },
    highlights: ["Desert styling", "Star deck", "Fort-facing sunset views"],
    houseRules: ["No parties", "No smoking", "Quiet hours after 10 PM"],
    priceDetails: {
      cleaningFee: 19,
      serviceFee: 14
    }
  },
  {
    title: "Backwater Lantern House",
    location: "Alleppey",
    country: "India",
    pricePerNight: 215,
    rating: 4.93,
    image: listingImage("lakeview-palace-retreat.jpg"),
    description: "A serene waterside stay with canoe access, tropical gardens, and open verandas.",
    guests: 5,
    bedrooms: 2,
    baths: 2,
    amenities: ["Waterfront", "Kayak", "Breakfast", "Garden"],
    category: "Luxury",
    host: {
      name: "Lakshmi",
      isSuperhost: true,
      joinedYear: 2017,
      avatar: hostAvatar("host-rhea.jpg")
    },
    address: {
      street: "23 Backwater Lane",
      city: "Alleppey",
      state: "Kerala",
      postalCode: "688001"
    },
    highlights: ["Private jetty", "Sunset canoe rides", "Chef-style Kerala breakfast"],
    houseRules: ["No loud music", "No smoking indoors", "Children welcome"],
    priceDetails: {
      cleaningFee: 23,
      serviceFee: 18
    }
  },
  {
    title: "Lisbon Tile Loft",
    location: "Lisbon",
    country: "Europe",
    pricePerNight: 225,
    rating: 4.89,
    image: listingImage("lisbon-tile-loft.jpg"),
    description: "A vibrant apartment with tiled walls, sunlit balconies, and tram access to the old quarters.",
    guests: 3,
    bedrooms: 1,
    baths: 1,
    amenities: ["Balcony", "Workspace", "Coffee bar", "Self check-in"],
    category: "City",
    host: {
      name: "Marta",
      isSuperhost: true,
      joinedYear: 2018,
      avatar: hostAvatar("host-anaya.jpg")
    },
    address: {
      street: "14 Alfama Rise",
      city: "Lisbon",
      state: "Lisbon",
      postalCode: "1100-120"
    },
    highlights: ["Historic tram access", "Tile-lined interiors", "River sunset spot nearby"],
    houseRules: ["No smoking", "No parties", "Quiet building"],
    priceDetails: {
      cleaningFee: 24,
      serviceFee: 18
    }
  },
  {
    title: "Amalfi Coast Breeze Villa",
    location: "Positano",
    country: "Europe",
    pricePerNight: 340,
    rating: 4.95,
    image: listingImage("oceanfront-glass-house.jpg"),
    description: "A cliffside beach stay with sea-facing terraces, lemon grove details, and quick access to the shore.",
    guests: 5,
    bedrooms: 2,
    baths: 2,
    amenities: ["Sea view", "Beach access", "Terrace", "Breakfast"],
    category: "Beach",
    host: {
      name: "Rhea",
      isSuperhost: true,
      joinedYear: 2019,
      avatar: hostAvatar("host-rhea.jpg")
    },
    address: {
      street: "12 Via Del Mare",
      city: "Positano",
      state: "Campania",
      postalCode: "84017"
    },
    highlights: ["Private sun deck", "Walk to beach clubs", "Sunset dining terrace"],
    houseRules: ["No smoking indoors", "No parties", "Check-in after 3 PM"],
    priceDetails: {
      cleaningFee: 39,
      serviceFee: 28
    }
  },
  {
    title: "Whitsundays Sand Deck House",
    location: "Airlie Beach",
    country: "Australia",
    pricePerNight: 315,
    rating: 4.92,
    image: listingImage("goa-palm-beach-villa.jpg"),
    description: "A light-filled beach home with sea breezes, a saltwater pool, and marina access.",
    guests: 6,
    bedrooms: 3,
    baths: 2,
    amenities: ["Beach nearby", "Pool", "BBQ", "Parking"],
    category: "Beach",
    host: {
      name: "Harper",
      isSuperhost: false,
      joinedYear: 2021,
      avatar: hostAvatar("host-rhea.jpg")
    },
    address: {
      street: "5 Coral Bay Drive",
      city: "Airlie Beach",
      state: "Queensland",
      postalCode: "4802"
    },
    highlights: ["Marina access", "Saltwater plunge pool", "Island-hopping base"],
    houseRules: ["No events", "No smoking indoors", "Check-in after 3 PM"],
    priceDetails: {
      cleaningFee: 34,
      serviceFee: 25
    }
  },
  {
    title: "Swiss Timber Peak Cabin",
    location: "Grindelwald",
    country: "Switzerland",
    pricePerNight: 395,
    rating: 4.98,
    image: listingImage("swiss-timber-peak-cabin.jpg"),
    description: "A polished mountain cabin with timber walls, hot chocolate mornings, and glacier views.",
    guests: 5,
    bedrooms: 2,
    baths: 2,
    amenities: ["Mountain view", "Fireplace", "Balcony", "Ski storage"],
    category: "Hillstation",
    host: {
      name: "Jonas",
      isSuperhost: true,
      joinedYear: 2015,
      avatar: hostAvatar("host-jonas.jpg")
    },
    address: {
      street: "9 Eiger Trail",
      city: "Grindelwald",
      state: "Bern",
      postalCode: "3818"
    },
    highlights: ["Eiger-facing balcony", "Heated floors", "Cable car nearby"],
    houseRules: ["No smoking", "No pets", "Quiet hours after 10 PM"],
    priceDetails: {
      cleaningFee: 46,
      serviceFee: 33
    }
  },
  {
    title: "Queen Street Design Studio",
    location: "Auckland",
    country: "New Zealand",
    pricePerNight: 240,
    rating: 4.9,
    image: listingImage("queen-street-design-studio.jpg"),
    description: "A refined downtown studio with gallery-inspired decor and easy access to the waterfront.",
    guests: 2,
    bedrooms: 1,
    baths: 1,
    amenities: ["Workspace", "Washer", "City view", "Self check-in"],
    category: "Design",
    host: {
      name: "Ella",
      isSuperhost: true,
      joinedYear: 2019,
      avatar: hostAvatar("host-farah.jpg")
    },
    address: {
      street: "44 Queen Street",
      city: "Auckland",
      state: "Auckland",
      postalCode: "1010"
    },
    highlights: ["Gallery-style interiors", "Walk to ferry terminal", "Sky tower views"],
    houseRules: ["No smoking", "No parties", "No extra guests"],
    priceDetails: {
      cleaningFee: 22,
      serviceFee: 17
    }
  },
  {
    title: "Oceanfront Glass House",
    location: "Malibu",
    country: "United States",
    pricePerNight: 420,
    rating: 4.96,
    image: listingImage("oceanfront-glass-house.jpg"),
    description: "A premium coastal stay with floor-to-ceiling windows and sunset views.",
    guests: 4,
    bedrooms: 2,
    baths: 2,
    amenities: ["Ocean view", "Pool", "Workspace", "Fast Wi-Fi"],
    category: "Beach",
    host: {
      name: "Olivia",
      isSuperhost: true,
      joinedYear: 2016,
      avatar: hostAvatar("host-rhea.jpg")
    },
    address: {
      street: "88 Pacific Crest Drive",
      city: "Malibu",
      state: "California",
      postalCode: "90265"
    },
    highlights: ["Sunset deck", "Infinity plunge pool", "Private beach access"],
    houseRules: ["No smoking", "Quiet hours after 10 PM", "No pets"],
    priceDetails: {
      cleaningFee: 60,
      serviceFee: 42
    }
  },
  {
    title: "Desert Design Retreat",
    location: "Palm Springs",
    country: "United States",
    pricePerNight: 310,
    rating: 4.89,
    image: listingImage("desert-design-retreat.jpg"),
    description: "Mid-century architecture with a private courtyard and mountain backdrop.",
    guests: 6,
    bedrooms: 3,
    baths: 2,
    amenities: ["Fire pit", "Pool", "Chef kitchen", "Self check-in"],
    category: "Design",
    host: {
      name: "Mason",
      isSuperhost: false,
      joinedYear: 2019,
      avatar: hostAvatar("host-nikhil.jpg")
    },
    address: {
      street: "45 Mirage Avenue",
      city: "Palm Springs",
      state: "California",
      postalCode: "92262"
    },
    highlights: ["Mid-century interiors", "Heated pool", "Indoor-outdoor dining"],
    houseRules: ["No events", "No smoking", "Check-out before 11 AM"],
    priceDetails: {
      cleaningFee: 48,
      serviceFee: 31
    }
  },
  {
    title: "Old Town Skyline Loft",
    location: "Prague",
    country: "Europe",
    pricePerNight: 210,
    rating: 4.91,
    image: listingImage("old-town-skyline-loft.jpg"),
    description: "A bright loft in the historic center with modern interiors and skyline views.",
    guests: 2,
    bedrooms: 1,
    baths: 1,
    amenities: ["Balcony", "Washer", "Coffee bar", "Bike storage"],
    category: "City",
    host: {
      name: "Eliska",
      isSuperhost: true,
      joinedYear: 2017,
      avatar: hostAvatar("host-farah.jpg")
    },
    address: {
      street: "7 Charles Bridge Lane",
      city: "Prague",
      state: "Old Town",
      postalCode: "11000"
    },
    highlights: ["Walkable old town location", "Designer kitchen", "Rooftop skyline view"],
    houseRules: ["No smoking", "No extra guests", "Quiet building after 9 PM"],
    priceDetails: {
      cleaningFee: 26,
      serviceFee: 20
    }
  },
  {
    title: "Harbour Light Residence",
    location: "Sydney",
    country: "Australia",
    pricePerNight: 295,
    rating: 4.88,
    image: listingImage("queen-street-design-studio.jpg"),
    description: "A polished harbour-side stay with airy interiors and easy ferry access.",
    guests: 4,
    bedrooms: 2,
    baths: 2,
    amenities: ["Harbour view", "Gym", "Fast Wi-Fi", "Parking"],
    category: "City",
    host: {
      name: "Sophie",
      isSuperhost: true,
      joinedYear: 2020,
      avatar: hostAvatar("host-anaya.jpg")
    },
    address: {
      street: "21 Circular Quay Street",
      city: "Sydney",
      state: "New South Wales",
      postalCode: "2000"
    },
    highlights: ["Opera House access", "Harbour balcony", "Concierge entry"],
    houseRules: ["No pets", "No parties", "Check-in after 3 PM"],
    priceDetails: {
      cleaningFee: 38,
      serviceFee: 27
    }
  },
  {
    title: "Kyoto Garden Machiya",
    location: "Kyoto",
    country: "Japan",
    pricePerNight: 285,
    rating: 4.94,
    image: listingImage("royal-courtyard-haveli.jpg"),
    description: "A restored machiya stay with a quiet inner garden, timber interiors, and temple district access.",
    guests: 4,
    bedrooms: 2,
    baths: 2,
    amenities: ["Garden", "Tea setup", "Wi-Fi", "Self check-in"],
    category: "Heritage",
    host: {
      name: "Anaya",
      isSuperhost: true,
      joinedYear: 2020,
      avatar: hostAvatar("host-anaya.jpg")
    },
    address: {
      street: "18 Higashiyama Lane",
      city: "Kyoto",
      state: "Kyoto",
      postalCode: "605-0821"
    },
    highlights: ["Private courtyard garden", "Walk to shrines", "Traditional wooden interiors"],
    houseRules: ["No smoking", "No parties", "Shoes off indoors"],
    priceDetails: {
      cleaningFee: 29,
      serviceFee: 21
    }
  },
  {
    title: "Dubai Marina Sky Suite",
    location: "Dubai",
    country: "United Arab Emirates",
    pricePerNight: 320,
    rating: 4.9,
    image: listingImage("marine-drive-sky-apartment.jpg"),
    description: "A polished high-rise stay with marina views, fast lifts, and quick beach club access.",
    guests: 3,
    bedrooms: 1,
    baths: 1,
    amenities: ["Marina view", "Pool", "Gym", "Workspace"],
    category: "City",
    host: {
      name: "Farah",
      isSuperhost: false,
      joinedYear: 2022,
      avatar: hostAvatar("host-farah.jpg")
    },
    address: {
      street: "77 Marina Walk",
      city: "Dubai",
      state: "Dubai",
      postalCode: "00000"
    },
    highlights: ["Skyline balcony", "Walk to marina promenade", "Beach clubs nearby"],
    houseRules: ["No smoking", "No parties", "Check-in after 3 PM"],
    priceDetails: {
      cleaningFee: 35,
      serviceFee: 24
    }
  },
  {
    title: "Vancouver Cedar Harbour Home",
    location: "Vancouver",
    country: "Canada",
    pricePerNight: 275,
    rating: 4.92,
    image: listingImage("cedar-mist-cottage.jpg"),
    description: "A cedar-lined urban retreat with harbor breezes, leafy streets, and mountain views on clear mornings.",
    guests: 5,
    bedrooms: 2,
    baths: 2,
    amenities: ["Harbour view", "Fireplace", "Parking", "Wi-Fi"],
    category: "City",
    host: {
      name: "Jonas",
      isSuperhost: true,
      joinedYear: 2015,
      avatar: hostAvatar("host-jonas.jpg")
    },
    address: {
      street: "42 Kits Point Road",
      city: "Vancouver",
      state: "British Columbia",
      postalCode: "V6K 1Y8"
    },
    highlights: ["Harbour walks nearby", "Mountain backdrop", "Quiet residential block"],
    houseRules: ["No smoking indoors", "No parties", "Quiet hours after 10 PM"],
    priceDetails: {
      cleaningFee: 31,
      serviceFee: 22
    }
  },
  {
    title: "Alpine Edge Chalet",
    location: "Queenstown",
    country: "New Zealand",
    pricePerNight: 330,
    rating: 4.97,
    image: listingImage("swiss-timber-peak-cabin.jpg"),
    description: "A mountain chalet with panoramic lake views, timber interiors, and fireplace nights.",
    guests: 6,
    bedrooms: 3,
    baths: 2,
    amenities: ["Mountain view", "Fireplace", "Hot tub", "Ski storage"],
    category: "Cabin",
    host: {
      name: "Noah",
      isSuperhost: true,
      joinedYear: 2015,
      avatar: hostAvatar("host-jonas.jpg")
    },
    address: {
      street: "4 Remarkables Ridge",
      city: "Queenstown",
      state: "Otago",
      postalCode: "9300"
    },
    highlights: ["Lake Wakatipu panorama", "Private hot tub", "Ski shuttle nearby"],
    houseRules: ["No smoking", "No parties", "Remove ski boots indoors"],
    priceDetails: {
      cleaningFee: 44,
      serviceFee: 32
    }
  },
  {
    title: "Snowline Spa Lodge",
    location: "Zermatt",
    country: "Switzerland",
    pricePerNight: 460,
    rating: 4.99,
    image: listingImage("swiss-timber-peak-cabin.jpg"),
    description: "A refined alpine lodge with spa amenities and uninterrupted Matterhorn scenery.",
    guests: 4,
    bedrooms: 2,
    baths: 2,
    amenities: ["Spa access", "Mountain view", "Sauna", "Breakfast"],
    category: "Luxury",
    host: {
      name: "Luca",
      isSuperhost: true,
      joinedYear: 2014,
      avatar: hostAvatar("host-jonas.jpg")
    },
    address: {
      street: "18 Alpine Promenade",
      city: "Zermatt",
      state: "Valais",
      postalCode: "3920"
    },
    highlights: ["Matterhorn view", "Sauna and spa suite", "Breakfast included"],
    houseRules: ["No smoking", "No pets", "Quiet hours after 10 PM"],
    priceDetails: {
      cleaningFee: 72,
      serviceFee: 49
    }
  },
  {
    title: "Cloudpass Summit Stay",
    location: "Shimla",
    country: "India",
    pricePerNight: 205,
    rating: 4.93,
    image: listingImage("cedar-mist-cottage.jpg"),
    description: "A ridge-top retreat with cedar rooms, pine trails, and long valley sunsets.",
    guests: 5,
    bedrooms: 2,
    baths: 2,
    amenities: ["Mountain view", "Fireplace", "Breakfast", "Parking"],
    category: "Hillstation",
    host: {
      name: "Meera",
      isSuperhost: true,
      joinedYear: 2017,
      avatar: hostAvatar("host-meera.jpg")
    },
    address: {
      street: "17 Jakhu Ridge Road",
      city: "Shimla",
      state: "Himachal Pradesh",
      postalCode: "171001"
    },
    highlights: ["Pine forest walks", "Sunset deck", "Colonial ridge access"],
    houseRules: ["No smoking indoors", "No parties", "Quiet hours after 10 PM"],
    priceDetails: {
      cleaningFee: 24,
      serviceFee: 17
    }
  },
  {
    title: "Blue Pine Valley Lodge",
    location: "Mussoorie",
    country: "India",
    pricePerNight: 198,
    rating: 4.91,
    image: listingImage("pine-crest-a-frame.jpg"),
    description: "A timber lodge above the valley with balcony breakfasts and misty morning views.",
    guests: 4,
    bedrooms: 2,
    baths: 2,
    amenities: ["Valley view", "Heater", "Balcony", "Self check-in"],
    category: "Hillstation",
    host: {
      name: "Jonas",
      isSuperhost: true,
      joinedYear: 2015,
      avatar: hostAvatar("host-jonas.jpg")
    },
    address: {
      street: "28 Camel Back Road",
      city: "Mussoorie",
      state: "Uttarakhand",
      postalCode: "248179"
    },
    highlights: ["Valley-facing balcony", "Library corner", "Mall Road nearby"],
    houseRules: ["No smoking", "No loud music", "Pets on request"],
    priceDetails: {
      cleaningFee: 22,
      serviceFee: 16
    }
  },
  {
    title: "Silver Fern Heights",
    location: "Ooty",
    country: "India",
    pricePerNight: 188,
    rating: 4.9,
    image: listingImage("tea-garden-ridge-house.jpg"),
    description: "A quiet hillside home with tea garden air, wraparound decks, and cool evenings.",
    guests: 5,
    bedrooms: 2,
    baths: 2,
    amenities: ["Tea garden view", "Garden", "Bonfire", "Breakfast"],
    category: "Hillstation",
    host: {
      name: "Anaya",
      isSuperhost: true,
      joinedYear: 2020,
      avatar: hostAvatar("host-anaya.jpg")
    },
    address: {
      street: "6 Fern Hill Loop",
      city: "Ooty",
      state: "Tamil Nadu",
      postalCode: "643001"
    },
    highlights: ["Tea trail access", "Wraparound deck", "Bonfire evenings"],
    houseRules: ["No smoking indoors", "No parties", "Check-in after 2 PM"],
    priceDetails: {
      cleaningFee: 21,
      serviceFee: 15
    }
  },
  {
    title: "Glacier View Hideaway",
    location: "Srinagar",
    country: "India",
    pricePerNight: 225,
    rating: 4.95,
    image: listingImage("swiss-timber-peak-cabin.jpg"),
    description: "A mountain-facing chalet with warm timber interiors and crisp air from the upper valley.",
    guests: 4,
    bedrooms: 2,
    baths: 2,
    amenities: ["Mountain view", "Fireplace", "Breakfast", "Heating"],
    category: "Hillstation",
    host: {
      name: "Jonas",
      isSuperhost: true,
      joinedYear: 2015,
      avatar: hostAvatar("host-jonas.jpg")
    },
    address: {
      street: "33 Gulmarg Approach",
      city: "Srinagar",
      state: "Jammu and Kashmir",
      postalCode: "190001"
    },
    highlights: ["Snow peak panorama", "Fireplace lounge", "Day trips to Gulmarg"],
    houseRules: ["No smoking", "No parties", "Government ID required"],
    priceDetails: {
      cleaningFee: 27,
      serviceFee: 19
    }
  }
];

const seedListings = async () => {
  try {
    await connectDB();
    await Listing.deleteMany();
    await Listing.insertMany(sampleListings);
    console.log("Listings seeded");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedListings();
