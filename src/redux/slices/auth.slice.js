import { getFunctions, httpsCallable } from "@react-native-firebase/functions";
import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
const functions = getFunctions(app, "us-west2");

const initialState = {
    loading: false,
    error: null,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
        .addCase({})
        .addCase({})
        .addMatcher({})
        .addMatcher({});
    },
});

export default authSlice.reducer;
export const { } = authSlice.actions;