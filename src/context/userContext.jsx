import { createContext, useContext, useState, useEffect } from "react";
import { signinUser, signupUser } from "../utils/databaseAPI.js";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = async (credentials) => {
        try {
            // credentials: { email, password }
            const response = await signinUser(credentials);
            setUser(response);
            localStorage.setItem("user", JSON.stringify(response));
        } catch (error) {
            console.error("Failed to sign in:", error);
            // Optionally handle or display an error message
        }
    };

    const signup = async (newUserData) => {
        try {
            // newUserData: { name, email, password, ...}
            const response = await signupUser(newUserData);
            setUser(response);
            localStorage.setItem("user", JSON.stringify(response));
        } catch (error) {
            console.error("Failed to sign up:", error);
            // Optionally handle or display an error message
        }
    };

    // Logout function
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    // Check if a user is saved
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </UserContext.Provider>
    );
};
