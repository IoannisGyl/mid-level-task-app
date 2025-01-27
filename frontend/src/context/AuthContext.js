import React, { createContext, useReducer } from "react";

const AuthContext = createContext();

// Reducer Function to handle state changes
const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            localStorage.setItem("token", action.payload.token);
            return { ...state, user: action.payload.user, isAuthenticated: true };
        case "LOGOUT":
            localStorage.removeItem("token");
            return { ...state, user: null, isAuthenticated: false };
        default:
            return state;
    }
};

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        isAuthenticated: !!localStorage.getItem("token"),
    });

    // Login function to authenticate the user
    const login = async (formData) => {
        const response = await fetch("/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await response.text(); // Read the response as text

        if (!response.ok || !data || data === "Invalid credentials" || data === "Something went wrong") throw new Error("Login failed");
        dispatch({ type: "LOGIN", payload: { user: formData.user, token: data } });
    };

    // Register function to create a new user
    const register = async (formData) => {
        const response = await fetch("/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });

        const data = await response.text(); // Read the response as text

        if (!response.ok || !data || data === "") {
            throw new Error("Registration failed. An account with that username might already exist. If the issue persists please try again later.");
        }

        return data; // Return the response if successful
    };

    const logout = () => {
        dispatch({ type: "LOGOUT"});
    };

    return (
        <AuthContext.Provider value={{ ...state, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
