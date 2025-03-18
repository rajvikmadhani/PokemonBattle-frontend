import { useState } from "react";
import { useUser } from "../context/userContext";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
    const { login } = useUser();
    const navigate = useNavigate();

    // Local state for email/password
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    // Handle "Sign in as Guest"
    const handleGuestLogin = async () => {
        // const fakeUser = { id: "123", name: "Ash Ketchum" };
        await login({ email: "guest@example.com", password: "guest" });
        navigate("/rooster");
    };

    // Handle the form submission for email/password login
    const handleSubmit = async (e) => {
        e.preventDefault();
        await login({ email, password });
        navigate("/rooster");
    };

    return (
        <div
            style={{ fontFamily: "'VT323', monospace" }}
            className="flex flex-col items-center justify-center min-h-screen p-4 text-xl"
        >
            <h2 className="text-4xl font-extrabold text-green-400 mb-6 drop-shadow-sm">
                Sign In
            </h2>

            <div className="border border-green-400 rounded-md p-6 w-full max-w-sm shadow-[0_0_10px_2px_rgba(34,197,94,0.5)] bg-transparent">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="email"
                            className="block mb-1 text-green-300"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            className="w-full px-3 py-2 rounded border border-green-400 bg-black text-green-200 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block mb-1 text-green-300"
                        >
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            className="w-full px-3 py-2 rounded border border-green-400 bg-black text-green-200 placeholder-green-500 focus:outline-none focus:ring-2 focus:ring-green-500"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="btn w-full bg-green-600 text-black font-bold hover:bg-green-400 transition-colors border-0 text-xl"
                    >
                        Sign In
                    </button>
                </form>

                <div className="divider text-green-500">OR</div>
                <button
                    onClick={handleGuestLogin}
                    className="btn w-full bg-black text-green-300 font-bold hover:bg-green-700 transition-colors border border-green-500 text-xl"
                >
                    Sign in as Guest
                </button>
            </div>
        </div>
    );
};

export default SignIn;
