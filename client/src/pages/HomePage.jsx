import { useEffect, useState } from "react";
import api from "../api/api";
import ListingCard from "../components/ListingCard";

const categories = ["Beach", "Design", "City", "Cabin", "Luxury", "Hillstation"];

const HomePage = () => {
  const [listings, setListings] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const featuredStats = [
    { label: "Curated homes", value: "28+" },
    { label: "Countries", value: "9" },
    { label: "Instant booking", value: "24/7" }
  ];
  const trustNotes = [
    {
      title: "Smooth check-in",
      copy: "Guests can book and confirm stays fast, without waiting on slow manual responses."
    },
    {
      title: "Design-first homes",
      copy: "The collection prioritizes properties that feel thoughtful, calm, and worth the trip."
    },
    {
      title: "Global mix",
      copy: "From hill escapes to beach houses, the catalog now spans multiple countries and stay styles."
    }
  ];
  const mapQuery = encodeURIComponent("India, Switzerland, Australia, New Zealand, Europe, United States");

  useEffect(() => {
    const loadListings = async () => {
      try {
        const { data } = await api.get("/listings", {
          params: {
            search,
            category
          }
        });
        setListings(data);
      } catch (_error) {
        setError("Failed to load listings");
      }
    };

    loadListings();
  }, [category, search]);

  return (
    <div className="page">
      <section className="hero">
        <div>
          <p className="eyebrow">Curated stays across the world</p>
          <h1>Book unique homes with instant checkout.</h1>
          <p className="hero-copy">
            Browse standout properties, sign in securely, and complete your stay with integrated payments.
          </p>
          <div className="hero-stats">
            {featuredStats.map((item) => (
              <article className="hero-stat panel" key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </article>
            ))}
          </div>
        </div>
        <div className="hero-search panel">
          <input
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search by city, country, or title"
            value={search}
          />
          <div className="category-list">
            <button
              className={!category ? "category-pill active" : "category-pill"}
              onClick={() => setCategory("")}
              type="button"
            >
              All
            </button>
            {categories.map((item) => (
              <button
                className={category === item ? "category-pill active" : "category-pill"}
                key={item}
                onClick={() => setCategory(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>

      {error ? <p className="form-error">{error}</p> : null}

      <section className="discovery-banner panel">
        <div>
          <p className="eyebrow">This week on StaySpace</p>
          <h2>Browse hill escapes, coastal villas, and design-forward city homes.</h2>
        </div>
        <p>
          Use the filters to narrow by category, or search by title, city, and country to find the right stay
          faster.
        </p>
      </section>

      <section className="home-map panel">
        <div className="home-map__content">
          <div>
            <p className="eyebrow">Stay Map</p>
            <h2>See where StaySpace homes are spread across regions and travel styles.</h2>
            <p>
              Explore a broader view of destinations across India and global locations, from hill stations to
              beaches, cities, and design stays.
            </p>
          </div>
          <div className="home-map__stats">
            <span>India</span>
            <span>Europe</span>
            <span>Australia</span>
            <span>New Zealand</span>
            <span>United States</span>
            <span>Switzerland</span>
          </div>
        </div>
        <iframe
          className="home-map__frame"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mapQuery}&z=2&output=embed`}
          title="StaySpace homepage map"
        />
      </section>

      <section className="listing-grid">
        {listings.length ? (
          listings.map((listing) => <ListingCard key={listing._id} listing={listing} />)
        ) : (
          <div className="empty-results panel">
            <h2>No stays match this search.</h2>
            <p>Try a different city, country, or category to see more options.</p>
          </div>
        )}
      </section>

      <section className="trust-strip">
        {trustNotes.map((item) => (
          <article className="trust-card panel" key={item.title}>
            <p className="eyebrow">Why StaySpace</p>
            <h3>{item.title}</h3>
            <p>{item.copy}</p>
          </article>
        ))}
      </section>
    </div>
  );
};

export default HomePage;
