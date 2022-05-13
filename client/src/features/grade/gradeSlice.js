import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import gradeService from "./gradeService";

const initialState = {
    grade: {},
    grades: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
};

// Add new grade
export const addGrade = createAsyncThunk("grade/addgrade", async (grade, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await gradeService.addGrade(grade, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//Get all grades
export const getAllGrades = createAsyncThunk("grade/getAll", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await gradeService.getAllGrades(token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//Update a designation
// export const updateDesignation = createAsyncThunk("designation/updateDesignation", async (designation, thunkAPI) => {
//     console.log(designation);
//     try {
//         const token = thunkAPI.getState().auth.user.token;
//         return await designationService.updateDesignation(designation, token);
//     } catch (error) {
//         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
//         return thunkAPI.rejectWithValue(message);
//     }
// })

// Delete a designation
// export const deleteDesignation = createAsyncThunk("designation/deleteDesignation", async (id, thunkAPI) => {
//     try {
//         const token = thunkAPI.getState().auth.user.token;
//         return await designationService.deleteDesignation(id, token);
//     } catch (error) {
//         const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
//         return thunkAPI.rejectWithValue(message);
//     }
// })



export const gradeSlice = createSlice({
    name: "grade",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(addGrade.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(addGrade.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.grade = action.payload;
        });
        builder.addCase(addGrade.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.message = action.payload;
        });
        builder.addCase(getAllGrades.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getAllGrades.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.grades = action.payload;
        });
        builder.addCase(getAllGrades.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.message = action.payload;
        });
        
    }
});

export const { reset } = gradeSlice.actions;
export default gradeSlice.reducer;
