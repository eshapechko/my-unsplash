import axios from 'axios';
import {ACCESS_KEY, API_URL_TOKEN, REDIRECT_URI, SECRET_KEY} from './const';
import {createAsyncThunk} from '@reduxjs/toolkit';

export const setToken = (token) => {
  localStorage.setItem('Bearer', token);
};

export const getToken = createAsyncThunk('getToken', async () => {
  let token = '';

  if (window.location.search.includes('?code')) {
    const AUTH_CODE = window.location.search.slice(6);

    try {
      const data = await axios.post(
        API_URL_TOKEN,
        {
          client_id: ACCESS_KEY,
          client_secret: SECRET_KEY,
          redirect_uri: REDIRECT_URI,
          code: AUTH_CODE,
          grant_type: 'authorization_code',
        },
        {
          headers: {
            'content-type': 'application/json',
          },
        },
      );
      console.log(data);
      token = await data.data.access_token;
      setToken(token);
    } catch (error) {
      return console.log(error.response);
    }
  }

  if (localStorage.getItem('Bearer')) {
    token = localStorage.getItem('Bearer');
  }
  return token;
});
