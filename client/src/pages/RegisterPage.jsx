import { Link, useNavigate } from "react-router-dom";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (form) => {
    await register(form);
    navigate("/");
  };

  return (
    <div className="page auth-page">
      <AuthForm
        footer={
          <>
            Already a member? <Link to="/login">Sign in</Link>
          </>
        }
        onSubmit={handleSubmit}
        submitLabel="Create account"
        title="Create your account"
      />
    </div>
  );
};

export default RegisterPage;
