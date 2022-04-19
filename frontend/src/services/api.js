import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3331',
})

export default api;