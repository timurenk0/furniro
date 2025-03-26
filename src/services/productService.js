import axios from "axios";

const API_URL = "http://localhost:5000/api/products";

export const fetchProducts = async (type, limit) => {
    try {
        let url = `${API_URL}?`;
        if (type) url += `type=${type}&`;
        if (limit) url += `_limit=${limit}`;

        url = url.endsWith("?") ? url.slice(0, -1) : url;
        console.log(url);

        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};

export const addProduct = async (product) => {
    try {
        const response = await axios.post(API_URL, product, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.data;
    } catch (error) {
        console.error("Error adding product:", error.response?.data || error.message);
    }
};

export const deleteProduct = async (id) => {
    try {
        const response = await axios.delete(API_URL + "/" + id);
        return response.data;
    } catch (error) {
        console.error("Error deleting product:", error.response?.data || error.message);
    }
}