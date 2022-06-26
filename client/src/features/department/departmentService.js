import axios from 'axios';

const API_URL = "/api/department/";

// Add new department
export const addDepartment = async (departmentData, token) => {
    try {
        const res = await axios.post(API_URL, departmentData, {
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

// Get all departments
export const getDepartments = async (token) => {
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

// Update a department
export const updateDepartment = async (departmentData, token) => {
    try {
        const { id } = departmentData;
        const res = await axios.put(`${API_URL}${id}`, departmentData, {
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

// Delete a department
export const deleteDepartment = async (deptId, token) => {
    try {
        const res = await axios.delete(API_URL + deptId, {
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

const departmentService = {
    addDepartment,
    getDepartments,
    updateDepartment,
    deleteDepartment
}

export default departmentService;