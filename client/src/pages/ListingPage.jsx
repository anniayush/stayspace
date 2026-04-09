import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/api";
import BookingWidget from "../components/BookingWidget";

const ListingPage = () => {
  const { id } = useParams();
  const [listing, setListing] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadListing = async () => {
      try {
        const { data } = await api.get(`/listings/${id}`);
        setListing(data);
      } catch (_error) {
        setError("Listing not found");
      }
    };

    loadListing();
  }, [id]);

  const mapQuery = useMemo(() => {
    if (!listing) {
      return "";
    }

    return encodeURIComponent(
      `${listing.address.street}, ${listing.address.city}, ${listing.address.state}, ${listing.country}`
    );
  }, [listing]);

  if (error) {
    return <p className="form-error">{error}</p>;
  }

  if (!listing) {
    return <p>Loading listing...</p>;
  }

  return (
    <div className="page listing-page">
      <section className="listing-hero">
        <img alt={listing.title} className="listing-page__image" src={listing.image} />
        <div>
          <p className="eyebrow">{listing.category}</p>
          <h1>{listing.title}</h1>
          <p>
            {listing.location}, {listing.country} · {listing.rating} rating
          </p>
          <div className="host-row">
            <img alt={listing.host.name} className="host-avatar" src={listing.host.avatar} />
            <div>
              <strong>Hosted by {listing.host.name}</strong>
              <p>
                {listing.host.isSuperhost ? "Superhost" : "Host"} · Hosting since{" "}
                {listing.host.joinedYear}
              </p>
            </div>
          </div>
          <p className="hero-copy">{listing.description}</p>
          <p className="address-line">
            {listing.address.street}, {listing.address.city}, {listing.address.state}{" "}
            {listing.address.postalCode}
          </p>
          <div className="amenities">
            {listing.amenities.map((amenity) => (
              <span className="amenity-pill" key={amenity}>
                {amenity}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="listing-layout">
        <article className="panel listing-facts">
          <h2>What this place offers</h2>
          <p>
            {listing.guests} guests · {listing.bedrooms} bedrooms · {listing.baths} baths
          </p>
          <div className="detail-columns">
            <div>
              <h3>Highlights</h3>
              <ul className="detail-list">
                {listing.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3>House rules</h3>
              <ul className="detail-list">
                {listing.houseRules.map((rule) => (
                  <li key={rule}>{rule}</li>
                ))}
              </ul>
            </div>
          </div>
        </article>
        <BookingWidget listing={listing} />
      </section>

      <section className="listing-map panel">
        <div className="listing-map__header">
          <div>
            <p className="eyebrow">Map View</p>
            <h2>Explore the listing location</h2>
          </div>
          <a
            className="button-link primary-button listing-map__link"
            href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
            rel="noreferrer"
            target="_blank"
          >
            Open in Maps
          </a>
        </div>
        <iframe
          className="listing-map__frame"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mapQuery}&z=13&output=embed`}
          title={`${listing.title} map`}
        />
      </section>
    </div>
  );
};

export default ListingPage;
