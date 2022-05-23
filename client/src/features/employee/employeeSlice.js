import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import employeeService from "./employeeService";

const initialState = {
    employee: [],
    employees: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
};

// Add new employee
export const addEmployee = createAsyncThunk("employee/addEmployee", async (employee, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token; 
        return await employeeService.addEmployee(employee, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//Get all employees
export const getEmployees = createAsyncThunk("employee/getAll", async (_,thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token; 
        return await employeeService.getEmployees(token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//Get a specific employee
export const getSpecificEmployee = createAsyncThunk(
    "Employee/getSpecific",
    async (id, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await employeeService.getSpecificEmployee(id, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Update specific employee
export const updateEmployee = createAsyncThunk(
    "Employee/update",
    async (employee, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await employeeService.updateEmployee(employee, token);
        } catch (error) {
            const message =
                (error.response &&
                    error.response.data &&
                    error.response.data.message) ||
                error.message ||
                error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);


export const employeeSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(addEmployee.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(addEmployee.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.employee = action.payload;
        });
        builder.addCase(addEmployee.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.message = action.payload;
        });
        builder.addCase(getEmployees.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getEmployees.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.employees = action.payload;
        });
        builder.addCase(getEmployees.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.message = action.payload;
        });
        builder.addCase(getSpecificEmployee.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getSpecificEmployee.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            // state.employee.push(action.payload);
            state.employee = action.payload;
        });
        builder.addCase(getSpecificEmployee.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.message = action.payload;
        });
        builder.addCase(updateEmployee.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateEmployee.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            // state.employee = action.payload;
        });
        builder.addCase(updateEmployee.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.message = action.payload;
        });
    }
});

export const { reset } = employeeSlice.actions;
export default employeeSlice.reducer;
