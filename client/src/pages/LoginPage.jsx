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
    <div className="page auth-page">
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
  );
};

export default LoginPage;
