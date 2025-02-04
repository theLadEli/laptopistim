import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        console.log("Checking localStorage for token..."); // 🛠 Debug log
        const token = localStorage.getItem("token");
        if (token) {
            console.log("Token found:", token); // 🛠 Debug log
            fetchUserDetails(token);
        }
    }, []);

    const fetchUserDetails = async (token) => {
        try {
            const response = await fetch("http://localhost:5200/account", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (response.ok) {
                const userData = await response.json();
                console.log("User data fetched:", userData); // 🛠 Debug log
                setUser(userData);
                setIsAuthenticated(true);
            } else {
                console.warn("Invalid token, clearing storage"); // 🛠 Debug log
                setIsAuthenticated(false);
                setUser(null);
                localStorage.removeItem("token");
            }
        } catch (err) {
            console.error("Error fetching user details:", err);
        }
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, setUser }}>
            {children}
        </AuthContext.Provider>
    );
};