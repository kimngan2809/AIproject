import axios from 'axios';

const API_URL = 'http://localhost:1339';

export const getCart = async (userId) => {
    try {
        const response = await axios.get(`${API_URL}/orders/${userId}/cart`);
        return response.data;
    } catch (error) {
        console.error('Error in getCart:', error);
        throw error;
    }
};


export const addToCart = async (userId, productId, quantity) => {
    try {
        const response = await axios.post(`${API_URL}/orders/add`, {
            userId,
            productId,
            quantity,
        });
        return response.data;
    } catch (error) {
        console.error('Error in addToCart:', error);
        throw error;
    }
};
