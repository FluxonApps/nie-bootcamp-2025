import React, { createContext, useState, useContext, useEffect } from 'react';

// The URL of your running backend
const API_URL = 'http://localhost:8002/api'; // From your vars.js

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token'));

    useEffect(() => {
        if (token) {
            setUser({ token });
        }
    }, [token]);

    const login = async (username, password) => {
        try {
            // Frontend-only fixed admin credentials bypass
            // NOTE: This is purely for demo/dev convenience. Do not use in production.
            const fixedAdminUsername = 'admin@feedtheneed.com';
            const fixedAdminPassword = 'Admin@123';
            if (username === fixedAdminUsername && password === fixedAdminPassword) {
                const fakeToken = 'fixed-admin-token';
                localStorage.setItem('token', fakeToken);
                setToken(fakeToken);
                setUser({ token: fakeToken, role: 'admin', username });
                return { success: true };
            }

            // Use fetch instead of axios
            const response = await fetch(`${API_URL}/users/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            // Unlike axios, fetch doesn't throw an error for bad HTTP statuses (like 401)
            // We must check for it manually.
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Login failed');
            }

            // Manually parse the JSON response
            const data = await response.json();
            const { token, role, username: serverUsername } = data;

            // Allow all roles; redirect will be handled by pages based on role
            localStorage.setItem('token', token);
            setToken(token);
            setUser({ token, role, username: serverUsername || username });
            return { success: true };

        } catch (error) {
            console.error("Login failed:", error.message);
            return { success: false, message: error.message };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    };

    const value = { user, token, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

