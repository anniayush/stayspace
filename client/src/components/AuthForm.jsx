import { useState } from "react";

const AuthForm = ({ onSubmit, submitLabel, title, footer }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [error, setError] = useState("");
  const needsName = submitLabel === "Create account";

  const handleChange = (event) => {
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");

    try {
      await onSubmit(form);
    } catch (submitError) {
      setError(submitError.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <form className="panel auth-form" onSubmit={handleSubmit}>
      <h1>{title}</h1>
      {needsName ? (
        <input
          name="name"
          onChange={handleChange}
          placeholder="Full name"
          required
          value={form.name}
        />
      ) : null}
      <input
        name="email"
        onChange={handleChange}
        placeholder="Email"
        required
        type="email"
        value={form.email}
      />
      <input
        minLength="6"
        name="password"
        onChange={handleChange}
        placeholder="Password"
        required
        type="password"
        value={form.password}
      />
      {error ? <p className="form-error">{error}</p> : null}
      <button className="primary-button" type="submit">
        {submitLabel}
      </button>
      <p className="auth-form__footer">{footer}</p>
    </form>
  );
};

export default AuthForm;
