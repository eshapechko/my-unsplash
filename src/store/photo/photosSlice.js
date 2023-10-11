import axios from 'axios';
import {ACCESS_KEY, API_URL} from '../../api/const';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const photosRequestAsync = createAsyncThunk(
  'getPhotos',
  async (_, {getState}) => {
    const page = getState().photos.page;
    const isLast = getState().photos.isLast;

    console.log('page: ', page);
    if (isLast) return;

    try {
      const res = await axios.get(
        `${API_URL}/photos?client_id=${ACCESS_KEY}&page=${page}&per_page=30`,
      );
      const photos = await res.data;
      console.log('photos: ', photos);

      return photos;
    } catch (error) {
      console.log(error);
    }
  },
);

const initialState = {
  loading: '',
  photos: [],
  error: '',
  page: 1,
  isLast: false,
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
    },
    [photosRequestAsync.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.photos = [...state.photos, ...action.payload];
      state.error = '';
      state.isLast = !action.payload;
    },
    [photosRequestAsync.rejected.type]: (state, action) => {
      state.loading = false;
      state.data = '';
      state.error = action.payload;
      state.page = 1;
    },
  },
});

export const {updatePage, clearPhotos} = photosSlice.actions;

export default photosSlice.reducer;
