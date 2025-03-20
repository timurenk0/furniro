import axios from "axios";

const API_URL = "http://localhost:5000/api";


const setAuthToken = (token) => {
    if (token) {
        axios.defaults.headers.common["x-auth-token"] = token;
    } else {
        delete axios.defaults.headers.common["x-auth-token"];
    }
}

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
        const response = await axios.post(API_URL + "/login", credentials);

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        setAuthToken(response.data.token);
        return response.data;
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
}

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setAuthToken(null);
}

export const getCurrentUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
}

export const isAuthenticated = () => {
    return localStorage.getItem("token") ? true : false;
}