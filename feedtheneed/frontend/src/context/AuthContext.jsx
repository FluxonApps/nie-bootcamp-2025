import React, { createContext, useState, useContext } from 'react';

const API_URL = 'http://localhost:8002/api';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

const getInitialAuthState = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    const userId = localStorage.getItem('userId'); // Get the user ID as well

    if (token && role && userId) {
        return { token, role, userId };
    }
    return null;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(getInitialAuthState());

    const login = async (username, password) => {
        try {
<<<<<<< HEAD
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
=======
>>>>>>> 977d585 (recipient integration)
            const response = await fetch(`${API_URL}/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Login failed');
            }

            const data = await response.json();
<<<<<<< HEAD
            const { token, role, username: serverUsername } = data;

            // Allow all roles; redirect will be handled by pages based on role
            localStorage.setItem('token', token);
            setToken(token);
            setUser({ token, role, username: serverUsername || username });
=======
            // Your backend's login response does not include the user ID.
            // We need to decode it from the JWT.
            // This is a simple (but insecure for frontend) way to do it.
            // A better backend would return the user object on login.
            const decodedToken = JSON.parse(atob(data.token.split('.')[1]));
            
            const { id, role } = decodedToken;

            if (role !== 'recipient') {
                throw new Error("Login failed: Not a recipient account.");
            }

            localStorage.setItem('token', data.token);
            localStorage.setItem('userRole', role);
            localStorage.setItem('userId', id); // Save the user's ID

            setUser({ token: data.token, role, userId: id });
>>>>>>> 977d585 (recipient integration)
            return { success: true };

        } catch (error) {
            console.error("Login failed:", error.message);
            localStorage.clear(); // Clear all auth data on failure
            return { success: false, message: error.message };
        }
    };

    const logout = () => {
        localStorage.clear(); // Clear all keys
        setUser(null);
    };

    const value = { user, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
