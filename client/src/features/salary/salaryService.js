import axios from 'axios';

const API_URL = "/api/salary/";

// Add new salary details to the database
export const addSalary = async (salaryData, token) => {
    try {
        const res = await axios.post(API_URL, salaryData, {
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

// Get all salaries by month and year for the selected employee
export const getAllSalariesByMonthAndYear = async (id, params, token) => {
    console.log(params);
    try {
        const res = await axios.get(`${API_URL}${id}`, {
            params: params,
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

const salaryService = {
    addSalary,
    getAllSalariesByMonthAndYear,
}

export default salaryService;