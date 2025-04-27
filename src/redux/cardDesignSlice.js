import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import WebFont from 'webfontloader';
import axios from 'axios';

export const fetchGoogleFonts = createAsyncThunk('cardDesign/fetchGoogleFonts', async (_, {rejectWithValue}) => {
    try {
        const response = await axios.get('https://www.googleapis.com/webfonts/v1/webfonts?key=AIzaSyB1oF-1rUS4ZlTZBdq-nLh9D944zgYYnhk');
        return response.data.items;
    } catch (error) {
        console.error('Error fetching ffont:', error);
        return rejectWithValue('Failed to fetch fonts');
    }
})

const initialState = {
    cardDesign : {
        cardStock: 'default',
        cardColor: '#000000',
        info: {
            businessName: "",
            email: "",
            phone:"",
            address: ""
        },
        font: "default",
    },
    fonts: [],
    isLoading: false,
    errMsg: '',
};

const cardDesignSlice = createSlice({
    name: 'cardDesign',
    initialState,
    reducers: {
        setCardStock: (state, action) => {
            state.cardDesign.cardStock = action.payload;
        },
        setCardColor: (state, action) => {
            state.cardDesign.cardColor = action.payload;
        },
        setInfo: (state, action) => {
            state.cardDesign.info = {...state.cardDesign.info, ...action.payload};
        },
        setFont: (state, action) => {
            state.cardDesign.font = action.payload;
            WebFont.load({
                google: {
                    families: [action.payload],
                },
            });
        },
        resetCardDesign: (state) => {
            state.cardDesign ={
                cardStock: 'default',
                cardColor: '#000000',
                info: {
                    businessName: "",
                    email: "",
                    phone:"",
                    address: ""
                },
                font: "default",
            }
        },
    },
    extraReducers: (builder => {
        builder
            .addCase(fetchGoogleFonts.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchGoogleFonts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.fonts = action.payload;
            })
            .addCase(fetchGoogleFonts.rejected, (state, action) => {
                state.isLoading = false;
                state.errMsg = action.payload;
            });
    }),
});


export const { setCardStock, setCardColor, setInfo, setFont, resetCardDesign } = cardDesignSlice.actions;
export const cardDesignSliceReducer = cardDesignSlice.reducer;