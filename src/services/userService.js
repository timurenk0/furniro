import axios from "axios";

const API_URL = "http://localhost:5000/api";


axios.defaults.withCredentials = true;

export const fetchUsers = async () => {
    try {
        const response = await axios.get(API_URL + "/users");
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error);
        return [];
    }
};

export const addUser = async (user) => {
    try {
        const response = await axios.post(API_URL + "/users", user);
        return response.data;
    } catch (error) {
        console.error("Error adding user:", error);
    }
}

export const loginUser = async (credentials) => {
    try {
        const response = await axios.post(API_URL + "/login", credentials, {
            withCredentials: true
        });
        return response.data;
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
}

export const logout = async () => {
    try {
        await axios.post(API_URL + "/logout", {}, { withCredentials: true })
        console.log("Logged out successfully")
        return true;
    } catch (error) {
        console.error("Logout error:", error)
    }
}

export const getCurrentUser = async () => {
    try {
        const response = await axios.get(API_URL + "/auth/me", { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Error getting current user:", error);
        return null;
    }
}

export const isAuthenticated = async () => {
    try {
        const user = await getCurrentUser();
        return !!user;
    } catch (error) {
        console.log("Authentication checking error:", error)
        return false;
    }
}

export const getUserRole = async () => {
    try {
        const response = await getCurrentUser();
        return response?.role;
    } catch (error) {
        console.error("Error getting user role:", error);
        return null;
    }
}