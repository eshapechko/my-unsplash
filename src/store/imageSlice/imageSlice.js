import axios from 'axios';
import {ACCESS_KEY, API_URL} from '../../api/const';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const imageRequestAsync = createAsyncThunk('getImage', async (id) => {
  try {
    const res = await axios.get(
      `${API_URL}/photos/${id}?client_id=${ACCESS_KEY}`,
    );

    const image = await res.data;
    return image;
  } catch (error) {
    console.log(error);
    return error.message;
  }
});

const initialState = {
  loading: '',
  image: {},
  error: '',
};

export const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    clearImage: (state) => {
      state.loading = '';
      state.image = {};
      state.error = '';
    },
  },
  extraReducers: {
    [imageRequestAsync.pending.type]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [imageRequestAsync.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.image = action.payload;
      state.error = '';
    },
    [imageRequestAsync.rejected.type]: (state, action) => {
      state.loading = false;
      state.data = '';
      state.error = action.payload;
    },
  },
});

export const {clearImage} = imageSlice.actions;

export default imageSlice.reducer;
