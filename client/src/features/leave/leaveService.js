import axios from 'axios';

const API_URL = "/api/leaveApplicationEmployee/";
// const API_URL_ADMIN = "api/admin/leaveApplication";

// Add new leave application
export const addLeaveApplication = async (leaveApplicationData, token) => {
    const { employee } = leaveApplicationData;
    try {
        const res = await axios.post(`${API_URL}${employee}`, leaveApplicationData, {
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

// Get all leave applications for current user
export const getLeaveApplications = async (userId,token) => {
    try {
        const res = await axios.get(API_URL + userId, {
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

// Get all leave applications for admin
export const getAllLeaveApplications = async (token) => {
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

// Get a specific leave application
export const getSpecificLeaveApplication = async (id, token) => {
    try {
        const res = await axios.get(`${API_URL}one/${id}`, {
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

// Update a specific leave application status
export const updateLeaveApplicationStatus = async (leaveApplication, token) => {
    try {
        const res = await axios.put(`${API_URL}one/${leaveApplication._id}`, leaveApplication, {
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

const leaveService = {
    addLeaveApplication,
    getLeaveApplications,
    getAllLeaveApplications,
    getSpecificLeaveApplication,
    updateLeaveApplicationStatus
}

export default leaveService;