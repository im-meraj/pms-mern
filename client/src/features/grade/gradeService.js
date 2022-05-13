import axios from 'axios';

const API_URL = "/api/grade/";

// Add new grade
export const addGrade = async (gradeData, token) => {
    try {
        const res = await axios.post(API_URL, gradeData, {
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

// Get all pay grades
export const getAllGrades = async (token) => {
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

// Update a pay grade
export const updateGrade = async (gradeData, token) => {
    try {
        const { path } = gradeData;
        const res = await axios.put(`${API_URL}${path}`, gradeData, {
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

// Delete a pay grade
export const deleteGrade = async (gradeId, token) => {
    try {
        const res = await axios.delete(API_URL + gradeId, {
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

const gradeService = {
    addGrade,
    getAllGrades,
    updateGrade,
    deleteGrade
}

export default gradeService;