import axios from "axios";
import aspida from "@aspida/axios";

import sdk from "./$api";

import { STORAGE_KEY_TOKEN } from "../src/lib/constants.ts";

const http = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEY_TOKEN);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export const api = sdk(aspida(http));
