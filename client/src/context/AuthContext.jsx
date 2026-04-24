import { createContext, useContext, useState, useCallback } from "react";


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem("token") || null);

    const saveToken = useCallback((token) => {
        localStorage.setItem("token", token);
        setToken(token);
    }, []);

    const fetchToken = useCallback(() => {
        return localStorage.getItem("token");
    }, []);

    /** Remove the token from both state and localStorage (logout) */
    const deleteToken = useCallback(() => {
        localStorage.removeItem("token");
        setToken(null);
    }, []);

    return (
        <AuthContext.Provider value={{ token, saveToken, fetchToken, deleteToken }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used inside an <AuthProvider>");
    }
    return context;
};

export default AuthContext;
