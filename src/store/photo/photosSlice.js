import axios from 'axios';
import {ACCESS_KEY, API_URL} from '../../api/const';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const photosRequestAsync = createAsyncThunk(
  'getPhotos',
  async (_, {getState, rejectWithValue}) => {
    const token = getState().token.token;
    const page = getState().photos.page;
    const isLast = getState().photos.isLast;

    if (isLast) return;

    try {
      const res = await axios.get(
        `${API_URL}/photos?client_id=${ACCESS_KEY}&page=${page}&per_page=30`,
        {
          headers: {
            Authorization: `${token ? `Bearer ${token}` : ''}`,
          },
        },
      );
      const photos = await res.data;
      return photos;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  loading: '',
  photos: [],
  error: '',
  page: 1,
  isLast: false,
  status: '',
};

export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  reducers: {
    updatePage: (state) => {
      state.page += 1;
    },
    clearPhotos: (state) => {
      state.loading = '';
      state.photos = [];
      state.error = '';
      state.page = 1;
      state.isLast = false;
    },
  },
  extraReducers: {
    [photosRequestAsync.pending.type]: (state) => {
      state.loading = true;
      state.error = '';
      state.status = 'pending';
    },
    [photosRequestAsync.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.photos = [...state.photos, ...action.payload];
      state.error = '';
      state.isLast = !action.payload;
      state.status = 'fulfilled';
    },
    [photosRequestAsync.rejected.type]: (state, action) => {
      state.loading = false;
      state.data = '';
      state.error = action.payload;
      state.page = 1;
      state.status = 'failure';
    },
  },
});

export const {updatePage, clearPhotos} = photosSlice.actions;

export default photosSlice.reducer;
