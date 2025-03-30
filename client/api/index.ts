import axios from "axios";
import aspida from "@aspida/axios";
import { addToast } from "@heroui/toast";

import { STORAGE_KEY_TOKEN } from "../src/lib/constants.ts";
import useAuthStore from "../src/store/auth.ts";

import sdk from "./$api";

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

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error?.response?.status === 401) {
      useAuthStore.getState().logout();
    }

    addToast({
      title: error?.response?.data?.message || "An error occurred.",
      icon: "error",
      color: "danger",
    });

    return Promise.reject(error);
  },
);

export const api = sdk(aspida(http));
