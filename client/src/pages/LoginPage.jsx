import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (form) => {
    await login({
      email: form.email,
      password: form.password
    });
    navigate("/");
  };

  return (
    <div className="page auth-page login-page">
      <div className="login-page__art" aria-hidden="true">
        <div className="login-page__shape login-page__shape--orb" />
        <div className="login-page__shape login-page__shape--diamond" />
        <div className="login-page__shape login-page__shape--ring" />
      </div>
      <section className="login-page__content">
        <article className="login-page__intro panel">
          <p className="eyebrow">Member Access</p>
          <h1>Return to your saved stays, trips, and recent searches.</h1>
          <p className="login-page__copy">
            Sign in to manage bookings faster, revisit favorite homes, and continue planning from where you
            stopped.
          </p>
          <div className="login-page__benefits">
            <div className="login-page__benefit">
              <strong>Fast rebooking</strong>
              <span>Pick up previous trips without searching from scratch.</span>
            </div>
            <div className="login-page__benefit">
              <strong>Saved preferences</strong>
              <span>Keep track of categories, locations, and shortlists you liked.</span>
            </div>
            <div className="login-page__benefit">
              <strong>Secure account access</strong>
              <span>Use the same account to book, review, and manage stays.</span>
            </div>
          </div>
          <div className="login-page__info-grid">
            <div className="login-page__info-card">
              <p className="eyebrow">Included</p>
              <strong>Booking history and trip tracking</strong>
              <span>See past reservations, upcoming stays, and key check-in details in one place.</span>
            </div>
            <div className="login-page__info-card">
              <p className="eyebrow">Helpful Tip</p>
              <strong>Use the same email you booked with before</strong>
              <span>That keeps your saved homes, booking notes, and trip details connected to one account.</span>
            </div>
          </div>
        </article>
        <div className="login-page__form-wrap">
          <div className="login-page__form-stack">
            <AuthForm
              footer={
                <>
                  Need an account? <Link to="/register">Create one</Link>
                </>
              }
              onSubmit={handleSubmit}
              submitLabel="Login"
              title="Welcome back"
            />
            <div className="login-page__support panel">
              <p className="eyebrow">Why Sign In</p>
              <ul className="login-page__support-list">
                <li>Manage reservations without re-entering trip details.</li>
                <li>Keep your shortlist synced across future visits.</li>
                <li>Access faster checkout for your next booking.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
