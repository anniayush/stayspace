import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ListingCard = ({ listing }) => {
  const { user, toggleFavorite } = useAuth();
  const navigate = useNavigate();
  const isFavorite = user?.favorites?.includes(listing._id);

  const handleFavorite = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!user) {
      navigate("/login");
      return;
    }

    await toggleFavorite(listing._id);
  };

  return (
    <Link className="listing-card" to={`/listings/${listing._id}`}>
      <button
        aria-label={isFavorite ? "Remove from wishlist" : "Add to wishlist"}
        className={isFavorite ? "favorite-button favorite-button--active" : "favorite-button"}
        onClick={handleFavorite}
        type="button"
      >
        {isFavorite ? "♥" : "♡"}
      </button>
      <img alt={listing.title} className="listing-card__image" src={listing.image} />
      <div className="listing-card__body">
        <div className="listing-card__top">
          <h3>{listing.title}</h3>
          <span>{listing.rating}</span>
        </div>
        <p>
          {listing.location}, {listing.country}
        </p>
        <p className="listing-card__price">${listing.pricePerNight} night</p>
      </div>
    </Link>
  );
};

export default ListingCard;
