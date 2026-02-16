// import React, { createContext, useState, useContext } from 'react';

// const API_URL = 'http://localhost:8002/api';

// const AuthContext = createContext(null);

// export const useAuth = () => useContext(AuthContext);

// const getInitialAuthState = () => {
//     const token = localStorage.getItem('token');
//     const role = localStorage.getItem('userRole');
//     const userId = localStorage.getItem('userId'); // Get the user ID as well

//     if (token && role && userId) {
//         return { token, role, userId };
//     }
//     return null;
// };

// export const AuthProvider = ({ children }) => {
//     const [user, setUser] = useState(getInitialAuthState());

//     const login = async (username, password) => {
//         try {
//             // Frontend-only fixed admin credentials bypass
//             // NOTE: This is purely for demo/dev convenience. Do not use in production.
//             const fixedAdminUsername = 'admin@feedtheneed.com';
//             const fixedAdminPassword = 'Admin@123';
//             if (username === fixedAdminUsername && password === fixedAdminPassword) {
//                 const fakeToken = 'fixed-admin-token';
//                 localStorage.setItem('token', fakeToken);
//                 setToken(fakeToken);
//                 setUser({ token: fakeToken, role: 'admin', username });
//                 return { success: true };
//             }

//             // Use fetch instead of axios
//             const response = await fetch(`${API_URL}/users/login`, {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ username, password }),
//             });

//             if (!response.ok) {
//                 const errorData = await response.json();
//                 throw new Error(errorData.error || 'Login failed');
//             }

//             const data = await response.json();
//             const { token, role, username: serverUsername } = data;

//             // Allow all roles; redirect will be handled by pages based on role
//             localStorage.setItem('token', token);
//             setToken(token);
//             setUser({ token, role, username: serverUsername || username });
//             return { success: true };

//         } catch (error) {
//             console.error("Login failed:", error.message);
//             localStorage.clear(); // Clear all auth data on failure
//             return { success: false, message: error.message };
//         }
//     };

//     const logout = () => {
//         localStorage.clear(); // Clear all keys
//         setUser(null);
//     };

//     const value = { user, login, logout };

//     return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
// };
import React, { createContext, useState, useContext } from 'react';

const API_URL = 'http://localhost:8002/api';

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

// Helper function to get the full user state from localStorage on initial load
const getInitialAuthState = () => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');
    const userId = localStorage.getItem('userId');
    const username = localStorage.getItem('username');

    if (token && role && userId) {
        return { token, role, userId, username };
    }
    return null;
};

export const AuthProvider = ({ children }) => {
    // We use a single 'user' state object to hold all authentication info.
    const [user, setUser] = useState(getInitialAuthState());

    const login = async (username, password) => {
        try {
            // --- This is the updated admin bypass logic ---
            const fixedAdminUsername = 'admin@feedtheneed.com';
            const fixedAdminPassword = 'Admin@123';
            if (username === fixedAdminUsername && password === fixedAdminPassword) {
                const fakeToken = 'fixed-admin-token-for-dev';
                const adminUser = {
                    token: fakeToken,
                    role: 'admin',
                    userId: 'admin-dev-id', // A placeholder ID
                    username: fixedAdminUsername,
                };
                localStorage.setItem('token', adminUser.token);
                localStorage.setItem('userRole', adminUser.role);
                localStorage.setItem('userId', adminUser.userId);
                localStorage.setItem('username', adminUser.username);
                setUser(adminUser); // Set the complete user object
                return { success: true };
            }

            // --- This is the main login logic for real users ---
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

            // Decode the JWT to get the user ID and role
            const decodedToken = JSON.parse(atob(data.token.split('.')[1]));
            const { id, role } = decodedToken;

            // Save all necessary items to localStorage
            localStorage.setItem('token', data.token);
            localStorage.setItem('userRole', role);
            localStorage.setItem('userId', id);
            localStorage.setItem('username', data.username);

            // Set the complete user object in the context's state
            setUser({ token: data.token, role, userId: id, username: data.username });
            return { success: true };

        } catch (error) {
            console.error("Login failed:", error.message);
            localStorage.clear(); // Clear all auth data on any kind of failure
            setUser(null);
            return { success: false, message: error.message };
        }
    };

    const logout = () => {
        // Clear everything to ensure a clean logout
        localStorage.clear();
        setUser(null);
    };

    // The context provides the user object and the login/logout functions
    const value = { user, login, logout };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};