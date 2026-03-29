import { useEffect, useState } from "react";
import api from "../api/api";
import ListingCard from "../components/ListingCard";

const categories = ["Beach", "Design", "City", "Cabin", "Luxury", "Hillstation"];

const HomePage = () => {
  const [listings, setListings] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");

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

      <section className="listing-grid">
        {listings.map((listing) => (
          <ListingCard key={listing._id} listing={listing} />
        ))}
      </section>
    </div>
  );
};

export default HomePage;
