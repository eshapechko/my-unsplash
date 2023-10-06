import axios from 'axios';
import {API_URL} from '../../api/const';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const photosRequestAsync = createAsyncThunk(
  'getPhotos',
  async (_, {getState}) => {
    const token = getState().token.token;
    if (!token) return;

    try {
      const res = await axios(`${API_URL}/photos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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
};

export const photosSlice = createSlice({
  name: 'photos',
  initialState,
  //   reducers: {
  //     authLogout: (state) => {
  //       state.data = '';
  //     },
  //   },
  extraReducers: {
    [photosRequestAsync.pending.type]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [photosRequestAsync.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.photos = action.payload;
      state.error = '';
    },
    [photosRequestAsync.rejected.type]: (state, action) => {
      state.loading = false;
      state.data = '';
      state.error = action.payload;
    },
  },
});

// export const {authLogout} = authSlice.actions;

export default photosSlice.reducer;
