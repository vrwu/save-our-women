import axios, { AxiosInstance } from 'axios';

//const serverURL: string = 'https://localhost:5000';
const serverURL: string = 'http://127.0.0.1:5000/'

const api: AxiosInstance = axios.create({
  baseURL: serverURL
});

export default api;
