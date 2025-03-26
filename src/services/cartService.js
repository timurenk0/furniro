import axios from "axios";

const API_URL = "http://localhost:5000/api/cart";

// Configure axios to include credentials (for auth cookies)
axios.defaults.withCredentials = true;

export const getCart = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error fetching cart:", error.response?.data || error.message);
        return { items: [] };
    }
};

export const addToCart = async (productId, quantity = 1) => {
    try {
        const response = await axios.post(`${API_URL}/items`, { productId, quantity });
        return response.data;
    } catch (error) {
        console.error("Error adding to cart:", error.response?.data || error.message);
        throw error;
    }
};

export const updateCartItem = async (productId, quantity) => {
    try {
        const response = await axios.put(`${API_URL}/items/${productId}`, { quantity });
        return response.data;
    } catch (error) {
        console.error("Error updating cart item:", error.response?.data || error.message);
        throw error;
    }
};

export const removeFromCart = async (productId) => {
    try {
        const response = await axios.delete(`${API_URL}/items/${productId}`);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Error removing from cart:", error.response?.data || error.message);
        throw error;
    }
};

export const clearCart = async () => {
    try {
        const response = await axios.delete(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error clearing cart:", error.response?.data || error.message);
        throw error;
    }
};

export const checkout = async () => {
    try {
        const response = await axios.post(`${API_URL}/checkout`);
        return response.data;
    } catch (error) {
        console.error("Error during checkout:", error.response?.data || error.message);
        throw error;
    }
};