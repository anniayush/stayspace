import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import ListingCard from "../components/ListingCard";
import { useAuth } from "../context/AuthContext";

const WishlistPage = () => {
  const { user, loading } = useAuth();
  const [listings, setListings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      return;
    }

    const loadWishlist = async () => {
      try {
        const { data } = await api.get("/auth/wishlist");
        setListings(data);
      } catch (_error) {
        setError("Unable to load your wishlist");
      }
    };

    loadWishlist();
  }, [user]);

  if (loading) {
    return <p>Loading wishlist...</p>;
  }

  if (!user) {
    return (
      <div className="page empty-state">
        <h1>Your wishlist</h1>
        <p>Login to save your favorite stays.</p>
        <Link className="primary-button button-link" to="/login">
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Your wishlist</h1>
      {error ? <p className="form-error">{error}</p> : null}
      {listings.length ? (
        <section className="listing-grid">
          {listings.map((listing) => (
            <ListingCard key={listing._id} listing={listing} />
          ))}
        </section>
      ) : (
        <div className="empty-results panel">
          <h2>No saved stays yet.</h2>
          <p>Tap the heart on any listing card to add it to your wishlist.</p>
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
