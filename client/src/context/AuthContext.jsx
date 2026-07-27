import { createContext, useContext, useEffect, useState } from "react";
import {
    loginUser,
    registerUser,
    getProfile,
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const loadUser = async () => {

            const token = localStorage.getItem("token");

            if (!token) {
                setLoading(false);
                return;
            }

            try {

                const data = await getProfile();

                if (data?.user) {
                    setUser(data.user);

                    localStorage.setItem(
                        "user",
                        JSON.stringify(data.user)
                    );
                } else {
                    throw new Error("No user profile returned");
                }

            } catch (error) {

                console.error("Authentication Error:", error);

                localStorage.removeItem("token");
                localStorage.removeItem("user");

                setUser(null);

            } finally {

                setLoading(false);

            }

        };

        loadUser();

    }, []);

    // Login
    const login = async (formData) => {

        const data = await loginUser(formData);

        localStorage.setItem("token", data.token);

        localStorage.setItem(
            "user",
            JSON.stringify(data.user)
        );

        setUser(data.user);

        return data;

    };

    // Register
    const register = async (formData) => {
        const response = await registerUser(formData);
        return response;
    };

    // Logout
    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);

    };

    return (

        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
            }}
        >

            {children}

        </AuthContext.Provider>

    );

};

export const useAuth = () => useContext(AuthContext);