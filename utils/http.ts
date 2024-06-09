import { SERVER } from '@/config/server.config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export const http = axios.create({
  baseURL: SERVER.SERVER_URL,
});

http.interceptors.request.use(
  async config => {
    const token = (await AsyncStorage.getItem('authToken')) || '';
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  },
);
