import { createContext, useContext, useState, useEffect } from "react";
import { isAuthenticated } from "./userService";
import { getUserRole } from "./userService";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const isLogged = async () => {
            try {
                const state = await isAuthenticated();
                setIsLoggedIn(state);
            } catch (error) {
                console.error("Error checking if user is logged in:", error)
            }
        }
        isLogged();

        const fetchUserRole = async () => {
            const role = await getUserRole();
            setUserRole(role);
        }
        fetchUserRole();
    }, [])

    return (
        <AuthContext.Provider value={{ isLoggedIn, userRole }}>
            {children}
        </AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired
}

export const useAuth = () => useContext(AuthContext);