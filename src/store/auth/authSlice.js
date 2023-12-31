import axios from 'axios';
import {API_URL} from '../../api/const';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

export const authRequestAsync = createAsyncThunk(
  'getAuth',
  async (_, {getState, rejectWithValue}) => {
    const token = getState().token.token;
    if (!token) return;

    try {
      const data = await axios(`${API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (data.status !== 200) {
        throw new Error('Can not get auth data. Server Error');
      }

      const authImg = data.data.profile_image.medium;
      const authName = data.data.name;

      return {name: authName, authImg};
    } catch (error) {
      if (error.message.includes('401')) {
        alert('Ошибка токена, получите новый токен');
      }

      return rejectWithValue(error.message);
    }
  },
);

const initialState = {
  loading: '',
  data: '',
  error: '',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authLogout: (state) => {
      state.data = '';
    },
  },
  extraReducers: {
    [authRequestAsync.pending.type]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [authRequestAsync.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.error = '';
    },
    [authRequestAsync.rejected.type]: (state, action) => {
      state.loading = false;
      state.data = '';
      state.error = action.payload;
    },
  },
});

export const {authLogout} = authSlice.actions;

export default authSlice.reducer;
