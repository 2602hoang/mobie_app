import axios from 'axios';

const api = axios.create({
  baseURL: "https://192.168.102.57:3001/"
});

export default api;