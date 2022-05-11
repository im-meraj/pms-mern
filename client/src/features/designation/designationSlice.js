import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import designationService from "./designationService";

const initialState = {
    designation: {},
    designations: [],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: ""
};

// Add new designation
export const addDesignation = createAsyncThunk("designation/addDesignation", async (designation, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await designationService.addDesignation(designation, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//Get all designations
export const getDesignations = createAsyncThunk("designation/getAll", async (_, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await designationService.getDesignations(token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

//Update a designation
export const updateDesignation = createAsyncThunk("designation/updateDesignation", async (designation, thunkAPI) => {
    console.log(designation);
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await designationService.updateDesignation(designation, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})

// Delete a designation
export const deleteDesignation = createAsyncThunk("designation/deleteDesignation", async (id, thunkAPI) => {
    try {
        const token = thunkAPI.getState().auth.user.token;
        return await designationService.deleteDesignation(id, token);
    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
        return thunkAPI.rejectWithValue(message);
    }
})



export const designationSlice = createSlice({
    name: "designation",
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(addDesignation.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(addDesignation.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.designation = action.payload;
        });
        builder.addCase(addDesignation.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.message = action.payload;
        });
        builder.addCase(getDesignations.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getDesignations.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.designations = action.payload;
        });
        builder.addCase(getDesignations.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.message = action.payload;
        });
        builder.addCase(updateDesignation.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(updateDesignation.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.designation = action.payload;
        });
        builder.addCase(updateDesignation.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.message = action.payload;
        });
        builder.addCase(deleteDesignation.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(deleteDesignation.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.designations = state.designations.filter(designation => designation.id !== action.payload);
        });
        builder.addCase(deleteDesignation.rejected, (state, action) => {
            state.isError = true;
            state.isLoading = false;
            state.message = action.payload;
        });
    }
});

export const { reset } = designationSlice.actions;
export default designationSlice.reducer;
