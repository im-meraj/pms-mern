import axios from 'axios';

const API_URL = "/api/employee/";

// Add new employee
export const addEmployee = async (employeeData, token) => {
    try {
        const res = await axios.post(API_URL, employeeData, {
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

// Get all employees
export const getEmployees = async (token) => {
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

// Get a specific employee
export const getSpecificEmployee = async (id, token) => {
    try {
        const res = await axios.get(API_URL + id, {
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

// Update specific employee
export const updateEmployee = async (employeeData, token) => {
    try {
        const res = await axios.put(API_URL + employeeData.id, employeeData, {
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

// Delete specific employee
export const deleteEmployee = async (id, token) => {
    try {
        const res = await axios.delete(API_URL + id, {
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

const employeeService = {
    addEmployee,
    getEmployees,
    getSpecificEmployee,
    updateEmployee,
    deleteEmployee
}

export default employeeService;