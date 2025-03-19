import axios from 'axios';
import { BACKEND_URL } from './databaseAPI';

export const getAuth = token => {
  return axios
    .get(`${BACKEND_URL}/auth/me`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => response.data);
};
