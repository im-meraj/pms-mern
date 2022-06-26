import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import departmentService from "./departmentService";

const initialState = {
    department: {},
    departments: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
};

// Add new department
export const addDepartment = createAsyncThunk("department/addDepartment", async (department, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await departmentService.addDepartment(department, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//Get all departments
export const getDepartments = createAsyncThunk("department/getAll", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await departmentService.getDepartments(token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//Update a department
export const updateDepartment = createAsyncThunk("department/updateDepartment", async (department, thunkAPI) => {
    console.log(department);
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await departmentService.updateDepartment(department, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// Delete a department
export const deleteDepartment = createAsyncThunk("department/deleteDepartment", async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await departmentService.deleteDepartment(id, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})



export const departmentSlice = createSlice({
    name: "department",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(addDepartment.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(addDepartment.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.department = action.payload;
        });
        builder.addCase(addDepartment.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.message = action.payload;
        });
        builder.addCase(getDepartments.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getDepartments.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.departments = action.payload;
        });
        builder.addCase(getDepartments.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.message = action.payload;
        });
        builder.addCase(updateDepartment.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateDepartment.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.department = action.payload;
        });
        builder.addCase(updateDepartment.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.message = action.payload;
        });
        builder.addCase(deleteDepartment.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteDepartment.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.departments = state.departments.filter(department => department.id !== action.payload);
        });
        builder.addCase(deleteDepartment.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.message = action.payload;
        });
    }
});

export const { reset } = departmentSlice.actions;
export default departmentSlice.reducer;
