import axios, { AxiosInstance } from 'axios';

const serverURL: string = 'https://localhost:5000';

const api: AxiosInstance = axios.create({
  baseURL: serverURL
});

export default api;
