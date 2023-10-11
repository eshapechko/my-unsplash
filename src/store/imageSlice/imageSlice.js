import axios from 'axios';
import {ACCESS_KEY, API_URL} from '../../api/const';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const imageRequestAsync = createAsyncThunk(
  'image/getImage',
  async (id, {rejectWithValue}) => {
    try {
      const res = await axios.get(
        `${API_URL}/photos/${id}?client_id=${ACCESS_KEY}`,
      );

      const image = await res.data;
      return image;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.message);
    }
  },
);

export const addLike = createAsyncThunk(
  'image/addLike',
  async (id, {getState, rejectWithValue}) => {
    const token = getState().token.token;
    if (!token) return;

    try {
      const response = await axios.post(
        `${API_URL}/photos/${id}/like`,
        {
          scope: 'write_likes',
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = response.data;
      return data;
    } catch (error) {
      console.log('error: ', error);
      return rejectWithValue(error.message);
    }
  },
);

export const removeLike = createAsyncThunk(
  'image/removeLike',
  async (id, {getState, rejectWithValue}) => {
    const token = getState().token.token;
    console.log('token: ', token);
    if (!token) return;

    try {
      const response = await axios.delete(`${API_URL}/photos/${id}/like`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = response.data;
      console.log('data-REMOVE: ', data);
      return data;
    } catch (error) {
      console.log('error: ', error);
      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  loading: '',
  image: {},
  error: '',
  like: null,
  likedUser: false,
};

export const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    clearImage: (state) => {
      state.loading = '';
      state.image = {};
      state.error = '';
      state.like = null;
      state.likedUser = false;
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
      state.like = action.payload.likes;
      state.error = '';
    },
    [imageRequestAsync.rejected.type]: (state, action) => {
      state.loading = false;
      state.data = '';
      state.error = action.payload;
    },

    [addLike.pending.type]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [addLike.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.like = action.payload.photo.likes;
      state.likedUser = action.payload.photo.liked_by_user;
      state.error = '';
    },
    [addLike.rejected.type]: (state, action) => {
      state.loading = false;
      state.like = '';
      state.likedUser = false;
      state.error = action.payload;
    },

    [removeLike.pending.type]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [removeLike.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.like = action.payload.photo.likes;
      state.likedUser = action.payload.photo.liked_by_user;
      state.error = '';
    },
    [removeLike.rejected.type]: (state, action) => {
      state.loading = false;
      state.like = '';
      state.likedUser = false;
      state.error = action.payload;
    },
  },
});

export const {clearImage} = imageSlice.actions;

export default imageSlice.reducer;
