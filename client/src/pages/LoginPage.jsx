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
        </article>
        <div className="login-page__form-wrap">
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
        </div>
      </section>
    </div>
  );
};

export default LoginPage;
