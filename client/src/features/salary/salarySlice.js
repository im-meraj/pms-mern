import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import salaryService from "./salaryService";

const initialState = {
    salary: [],
    salaries: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: "",
};

// Add new salary details to the database
export const addSalary = createAsyncThunk(
    "salary/addSalary",
    async (salaryData, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await salaryService.addSalary(salaryData, token);
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

// Get all salaries by month and year for the selected employee
export const getAllSalariesByMonthAndYear = createAsyncThunk(
    "salary/getAllSalariesByMonthAndYear",
    async ({id, params}, thunkAPI) => {
        try {
            const token = thunkAPI.getState().auth.user.token;
            return await salaryService.getAllSalariesByMonthAndYear(id, params, token);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);




export const salarySlice = createSlice({
    name: "salary",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(addSalary.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(addSalary.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.salary = action.payload;
        });
        builder.addCase(addSalary.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
        builder.addCase(getAllSalariesByMonthAndYear.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(getAllSalariesByMonthAndYear.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.salaries = action.payload;
        });
        builder.addCase(getAllSalariesByMonthAndYear.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
            state.message = action.payload;
        });
        
    },
});

export const { reset } = salarySlice.actions;
export default salarySlice.reducer;
