import axios from "axios";

export const searchProducts = async (text) => {
    try {
        const response = await axios.get(`http://localhost:3001/search?text=${text}`);
        return response.data.results;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const getProductDetails = async (producId) => {
    try {
        const response = await axios.get(`http://localhost:3001/product/${producId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return null;
    }
}