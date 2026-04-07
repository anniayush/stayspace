import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

const BookingsPage = () => {
  const { user, loading } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!user) {
      return;
    }

    const loadBookings = async () => {
      try {
        const { data } = await api.get("/bookings/mine");
        setBookings(data);
      } catch (_error) {
        setError("Unable to load your bookings");
      }
    };

    loadBookings();
  }, [user]);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (!user) {
    return (
      <div className="page empty-state">
        <h1>Your trips</h1>
        <p>Sign in to view and manage your reservations.</p>
        <Link className="primary-button button-link" to="/login">
          Login
        </Link>
      </div>
    );
  }

  return (
    <div className="page">
      <h1>Your trips</h1>
      {error ? <p className="form-error">{error}</p> : null}
      <div className="bookings-list">
        {bookings.map((booking) => (
          <article className="panel booking-card" key={booking._id}>
            <img alt={booking.listing.title} src={booking.listing.image} />
            <div>
              <h2>{booking.listing.title}</h2>
              <p>
                {new Date(booking.startDate).toLocaleDateString()} to{" "}
                {new Date(booking.endDate).toLocaleDateString()}
              </p>
              <p>
                {booking.nights} nights · ${booking.totalPrice}
              </p>
              <p>
                {booking.guests} guest(s) · {booking.reservationName}, age {booking.reservationAge}
              </p>
              <p className="booking-status">{booking.paymentStatus}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BookingsPage;
