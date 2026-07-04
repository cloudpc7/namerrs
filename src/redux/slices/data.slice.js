// Redux Slice Function for fetching data from firestore database
// Crud Application Slice functionality
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getFunctions, httpsCallable } from "@react-native-firebase/functions";
import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
const functions = getFunctions(app, "us-west2");

export const createObject = createAsyncThunk(
    "object/createObject",
    async ( data, { rejectWithValue }) => {
    
    if (!data || Object.keys(data).length === 0 ) {
        return rejectWithValue("Data is missing.");
    };

    try {
        const newRequest = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        };
        
        const response = await fetch(url, newRequest);

        if (!response.ok) {
            const error = await response.json();
            return rejectWithValue(error.message || "Failed to create object");
        };

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        return rejectWithValue(error.message);
    }
});

export const fetchObject = createAsyncThunk(
    "object/fetchObject",
    async (req = {}, { rejectWithValue }) => {
    try {
        const {id} = req;
        const queryParams = new URLSearchParams();

        if (id) {
            queryParams.append("id", id);
        };

        const queryString = queryParams.toString();
        const endpoint = queryString ? `/object?${queryString}` : '/object';
        
        const response = await fetch(`${url}${endpoint}`);

        if (!response.ok) {
            return rejectWithValue("Failed to fetch object");
        };

        const data = await response.json();
        return data;

    } catch (error) {
        return rejectWithValue(error.message);
    };
});

export const updateObject = createAsyncThunk(
    "object/updateObject",
    async (req,{ rejectWithValue }) => {
        const id = req.id;
        if(!req.id || Object.keys(req).length === 0) {
            return rejectWithValue("Feedback data is missing.");
        };

    try {

        const updatedRequest = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(req),
        };

        const response = await fetch(`${url}/${id}`,updatedRequest);

        if (!response.ok) {
            return rejectWithValue("Failed to update feedback");
        };

        const data = await response.json();
        return data;

    } catch (error) {
        return rejectWithValue(error.message);
    };
});

export const removeObject = createAsyncThunk(
    "object/removeObject",
    async (req,{ rejectWithValue }) => {
    const id = req.id;

    if(!req.id || Object.keys(req).length === 0) {
            return rejectWithValue("data is missing.");
    };

    try {
      const deletedRequest = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch(`${url}/${id}`, deletedRequest);

      if (!response.ok) {
        return rejectWithValue("Failed to delete feedback");
      };

      await response.json();
      return id;

    } catch (error) {
        return rejectWithValue(error.message);
    };
});

const initialState = {
    loading: false,
    error: null,
    data: [],
};

const dataSlice = createSlice({
    name: "object",
    initialState,
    reducers: {
       setError: (state, action) => {
        state.error = action.payload;
       },
       setLoading: (state, action) => {
        state.loading = action.payload;
       },
    },
    extraReducers: (builder) =>  {
        builder
        .addCase()
        .addCase()
        .addCase()
        .addCase()
        .addMatcher()
        .addMatcher();
    },
});

export default dataSlice.reducer;