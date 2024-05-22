import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center w-full h-screen">
      <button
        onClick={() => navigate("/homepage")}
        className="btn-secondary w-1/3"
      >
        Login
      </button>
    </div>
  );
};

export default LoginPage;
