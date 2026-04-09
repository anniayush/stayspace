import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/api";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [resetPath, setResetPath] = useState("");
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setStatus("");

    try {
      const { data } = await api.post("/auth/forgot-password", { email });
      setStatus("Reset link generated for this account.");
      setResetPath(data.resetPath || "");
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to generate reset link");
    }
  };

  return (
    <div className="page auth-page password-page">
      <form className="panel auth-form password-form" onSubmit={handleSubmit}>
        <p className="eyebrow">Password Help</p>
        <h1>Forgot your password?</h1>
        <p className="password-page__copy">Enter your account email to generate a password reset link.</p>
        <input
          name="email"
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email"
          required
          type="email"
          value={email}
        />
        {error ? <p className="form-error">{error}</p> : null}
        {status ? <p className="form-success">{status}</p> : null}
        {resetPath ? (
          <p className="password-page__reset-link">
            Continue here: <Link to={resetPath}>Reset password</Link>
          </p>
        ) : null}
        <button className="primary-button" type="submit">
          Generate reset link
        </button>
        <p className="auth-form__footer">
          Back to <Link to="/login">login</Link>
        </p>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
