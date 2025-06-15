import axios from "axios";

function httpService() {
    const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
      //Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
  return API
}

export const AXIOS = httpService();
