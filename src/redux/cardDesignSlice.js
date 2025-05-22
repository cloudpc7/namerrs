import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Mockable fetch function
export const fetchFontsApi = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error('Network error fetching fonts');
  }
  return response.json();
};

export const fetchGoogleFonts = createAsyncThunk('cardDesign/fetchGoogleFonts', async (_, { rejectWithValue }) => {
  try {
    const response = await fetchFontsApi(
      `https://www.googleapis.com/webfonts/v1/webfonts?key=${process.env.REACT_APP_GOOGLE_API_KEY}`
    );
    if (!response.items) {
      throw new Error('No fonts returned from API');
    }
    return response.items;
  } catch (err) {
    return rejectWithValue(err.message || 'Failed to fetch fonts');
  }
});

const cardDesignSlice = createSlice({
  name: 'cardDesign',
  initialState: {
    cardDesign: {
      cardStock: 'default',
      cardColor: '#000000',
      info: {
        businessName: '',
        email: '',
        phone: '',
        address: '',
      },
      font: 'Roboto',
    },
    fonts: [],
    isLoading: false,
    errMsg: '',
  },
  reducers: {
    setCardStock(state, action) {
      state.cardDesign.cardStock = action.payload;
      state.errMsg = '';
    },
    setCardColor(state, action) {
      state.cardDesign.cardColor = action.payload;
      state.errMsg = '';
    },
    setInfo(state, action) {
      state.cardDesign.info = { ...state.cardDesign.info, ...action.payload };
      state.errMsg = '';
    },
    setFont(state, action) {
      state.cardDesign.font = action.payload;
      state.errMsg = '';
      const fontName = action.payload.replace(/\s+/g, '+');
      const link = document.createElement('link');
      link.href = `https://fonts.googleapis.com/css2?family=${fontName}&display=swap`;
      link.rel = 'stylesheet';
      document.querySelectorAll('link[data-dynamic-font]').forEach((el) => el.remove());
      link.setAttribute('data-dynamic-font', action.payload);
      document.head.appendChild(link);
    },
    setError(state, action) {
      state.errMsg = action.payload;
    },
    resetCardDesign(state) {
      state.cardDesign = {
        cardStock: 'default',
        cardColor: '#000000',
        info: {
          businessName: '',
          email: '',
          phone: '',
          address: '',
        },
        font: 'Roboto',
      };
      state.errMsg = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoogleFonts.pending, (state) => {
        state.isLoading = true;
        state.errMsg = '';
      })
      .addCase(fetchGoogleFonts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.fonts = action.payload;
        state.errMsg = '';
      })
      .addCase(fetchGoogleFonts.rejected, (state, action) => {
        state.isLoading = false;
        state.errMsg = action.payload;
      });
  },
});

export const { setCardStock, setCardColor, setInfo, setFont, setError, resetCardDesign } = cardDesignSlice.actions;
export const cardDesignSliceReducer = cardDesignSlice.reducer;