import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false); 

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            fetchUserDetails(token);
        } else {
            // console.log('No token found in local storage')
            setIsAuthenticated(false);
        }
    }, []);

    const fetchUserDetails = async (token) => {
        try {
            const response = await fetch("https://laptopistim.onrender.com/account", {
                method: "GET",
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: ${response.statusText}`);
            }
    
            const data = await response.json();
            // console.log("User data:", data);
            setUser(data);
            setIsAuthenticated(true);
        } catch (error){
            console.error("Fetch error:", error);
        }
    };

    const login = async (email, password) => {
        const response = await fetch("https://laptopistim.onrender.com/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await response.json();
        if (response.ok && data.token) {
            localStorage.setItem("token", data.token);
            setUser({ id: data.userId });
            setIsAuthenticated(true);
        } else {
            throw new Error(data.message)
        }
    };

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setIsAuthenticated(false);
        window.location.href = "/";
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};