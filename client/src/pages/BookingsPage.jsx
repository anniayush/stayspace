import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";
import { useAuth } from "../context/AuthContext";

const bookingTimeline = ["pending", "confirmed", "cancelled", "done"];

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
            <div className="booking-card__content">
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
              <p className="booking-status">{booking.currentStatus}</p>
              <div className="booking-timeline" role="list" aria-label="Booking timeline">
                {bookingTimeline.map((step) => {
                  const isCurrent = booking.currentStatus === step;
                  const isComplete =
                    booking.currentStatus === "cancelled"
                      ? step === "pending" || step === "confirmed" || step === "cancelled"
                      : bookingTimeline.indexOf(step) <= bookingTimeline.indexOf(booking.currentStatus);

                  return (
                    <div
                      className={
                        isCurrent
                          ? "booking-timeline__step booking-timeline__step--current"
                          : isComplete
                            ? "booking-timeline__step booking-timeline__step--complete"
                            : "booking-timeline__step"
                      }
                      key={step}
                      role="listitem"
                    >
                      <span className="booking-timeline__dot" />
                      <span>{step}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default BookingsPage;
