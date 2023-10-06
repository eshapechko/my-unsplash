import {createSlice} from '@reduxjs/toolkit';
import {getToken} from '../../api/token';

const initialState = {
  loading: '',
  token: '',
  error: '',
};

export const tokenSlice = createSlice({
  name: 'token',
  initialState,
  reducers: {
    deleteToken: (state) => {
      state.token = '';
    },
  },
  extraReducers: {
    [getToken.pending.type]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [getToken.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.token = action.payload;
      state.error = '';
    },
    [getToken.rejected.type]: (state, action) => {
      state.loading = false;
      state.token = '';
      state.error = action.payload;
    },
  },
});

export const {deleteToken} = tokenSlice.actions;

export default tokenSlice.reducer;
