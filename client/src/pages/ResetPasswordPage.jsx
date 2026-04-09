import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../api/api";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setStatus("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const { data } = await api.post(`/auth/reset-password/${token}`, { password });
      setStatus(data.message);
      setTimeout(() => navigate("/login"), 1200);
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to reset password");
    }
  };

  return (
    <div className="page auth-page password-page">
      <form className="panel auth-form password-form" onSubmit={handleSubmit}>
        <p className="eyebrow">Reset Password</p>
        <h1>Create a new password</h1>
        <p className="password-page__copy">Choose a new password to regain access to your StaySpace account.</p>
        <input
          minLength="6"
          onChange={(event) => setPassword(event.target.value)}
          placeholder="New password"
          required
          type="password"
          value={password}
        />
        <input
          minLength="6"
          onChange={(event) => setConfirmPassword(event.target.value)}
          placeholder="Confirm new password"
          required
          type="password"
          value={confirmPassword}
        />
        {error ? <p className="form-error">{error}</p> : null}
        {status ? <p className="form-success">{status}</p> : null}
        <button className="primary-button" type="submit">
          Reset password
        </button>
        <p className="auth-form__footer">
          Back to <Link to="/login">login</Link>
        </p>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
