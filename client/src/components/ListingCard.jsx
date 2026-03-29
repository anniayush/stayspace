import { Link } from "react-router-dom";

const ListingCard = ({ listing }) => (
  <Link className="listing-card" to={`/listings/${listing._id}`}>
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

export default ListingCard;
