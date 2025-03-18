// SignUp.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";

const SignUp = () => {
    const navigate = useNavigate();
    const { signup } = useUser();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData((prevData) => ({
            ...prevData,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(formData);
        navigate("/signin");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-3xl font-bold mb-6">Sign Up</h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-80">
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="input input-bordered w-full"
                    value={formData.name}
                    onChange={handleChange}
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="input input-bordered w-full"
                    value={formData.email}
                    onChange={handleChange}
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="input input-bordered w-full"
                    value={formData.password}
                    onChange={handleChange}
                />

                <button className="btn btn-primary">Create Account</button>
            </form>
        </div>
    );
};

export default SignUp;
