import {configureStore} from '@reduxjs/toolkit';
import tokenReducer from './token/tokenSlice';
import authReducer from './auth/authSlice';
import photosReducer from './photo/photosSlice';

export const store = configureStore({
  reducer: {
    token: tokenReducer,
    auth: authReducer,
    photos: photosReducer,
  },
});
