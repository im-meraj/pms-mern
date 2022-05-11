import axios from 'axios';

const API_URL = "/api/designation/";

// Add new designation
export const addDesignation = async (designationData, token) => {
    try {
        const res = await axios.post(API_URL, designationData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        const message = (error.res && error.res.data && error.res.data.message) || error.message || error.toString();
        throw new Error(message);
    }
}

// Get all designations
export const getDesignations = async (token) => {
    try {
        const res = await axios.get(API_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        const message = (error.res && error.res.data && error.res.data.message) || error.message || error.toString();
        throw new Error(message);
    }
}

// Update a designation
export const updateDesignation = async (designationData, token) => {
    try {
        const { path } = designationData;
        const res = await axios.put(`${API_URL}${path}`, designationData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        const message = (error.res && error.res.data && error.res.data.message) || error.message || error.toString();
        throw new Error(message);
    }
}

// Delete a designation
export const deleteDesignation = async (designationId, token) => {
    try {
        const res = await axios.delete(API_URL + designationId, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return res.data;
    } catch (error) {
        const message = (error.res && error.res.data && error.res.data.message) || error.message || error.toString();
        throw new Error(message);
    }
}

const designationService = {
    addDesignation,
    getDesignations,
    updateDesignation,
    deleteDesignation
}

export default designationService;