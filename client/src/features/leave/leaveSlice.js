import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import leaveService from "./leaveService";

const initialState = {
    leaveApplication: [],
    leaveApplications: [],
    allLeaveApplications: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
};

// Add new leave application
export const addLeaveApplication = createAsyncThunk("leaveApplicationEmployee/addLeaveApplication", async (leaveApplication, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await leaveService.addLeaveApplication(leaveApplication, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//Get all leave applications for current user
export const getLeaveApplications = createAsyncThunk("leaveApplicationEmployee/getAll", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        const userId = thunkAPI.getState().auth.user._id;
        return await leaveService.getLeaveApplications(userId, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//Get all leave applications for admin
export const getAllLeaveApplications = createAsyncThunk("leaveApplicationEmployee/getAllAdmin", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await leaveService.getAllLeaveApplications(token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//Get a specific leave application
export const getSpecificLeaveApplication = createAsyncThunk("leaveApplicationEmployee/getSpecific", async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await leaveService.getSpecificLeaveApplication(id, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//Update a specific leave application status
export const updateLeaveApplicationStatus = createAsyncThunk("leaveApplicationEmployee/updateStatus", async (leaveApplication, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await leaveService.updateLeaveApplicationStatus(leaveApplication, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// Delete a department
// export const deleteDepartment = createAsyncThunk("department/deleteDepartment", async (id, thunkAPI) => {
//     try {
//         const token = thunkAPI.getState().auth.user.token;
//         return await departmentService.deleteDepartment(id, token);
//     } catch (error) {
//         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
//         return thunkAPI.rejectWithValue(message);
//     }
// })



export const leaveSlice = createSlice({
    name: "leaveApplicationEmployee",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(addLeaveApplication.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(addLeaveApplication.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.leaveApplication = action.payload;
        });
        builder.addCase(addLeaveApplication.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.message = action.payload;
        });
        builder.addCase(getLeaveApplications.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getLeaveApplications.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.leaveApplications = action.payload;
        });
        builder.addCase(getLeaveApplications.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.message = action.payload;
        });
        builder.addCase(getAllLeaveApplications.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllLeaveApplications.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.allLeaveApplications = action.payload;
        });
        builder.addCase(getAllLeaveApplications.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.message = action.payload;
        });
        builder.addCase(getSpecificLeaveApplication.pending, (state) => {
            state.isLoading = true;
        }
        );
        builder.addCase(getSpecificLeaveApplication.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.leaveApplication = action.payload;
        });
        builder.addCase(getSpecificLeaveApplication.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.message = action.payload;
        });
    }

});

export const { reset } = leaveSlice.actions;
export default leaveSlice.reducer;
