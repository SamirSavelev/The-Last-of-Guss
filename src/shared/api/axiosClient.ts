import axios, { AxiosError } from 'axios';
import { API_BASE_URL } from '@shared/config/env';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers = config.headers ?? {};
    if (!config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export interface ApiErrorData {
  message?: string;
}

export type ApiError = AxiosError<ApiErrorData>;
