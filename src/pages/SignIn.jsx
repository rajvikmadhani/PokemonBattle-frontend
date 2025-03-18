import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const { login } = useUser();
  const navigate = useNavigate();

  const handleLogin = () => {
    const fakeUser = { id: "123", name: "Ash Ketchum" };
    login(fakeUser);
    navigate("/rooster"); // Nach dem Login zur Rooster-Seite weiterleiten
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl font-bold mb-4">Sign In</h2>
      <button
        onClick={handleLogin}
        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all"
      >
        Sign in as Guest
      </button>
    </div>
  );
};

export default SignIn;
