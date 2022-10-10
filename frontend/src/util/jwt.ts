import { AUTH_TOKEN_STORAGE_KEY, REFRESH_TOKEN_STORAGE_KEY } from "../constants";

export const setAuthToken = (token: string) => localStorage.setItem(AUTH_TOKEN_STORAGE_KEY, token);

export const setRefreshToken = (token: string) => localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, token);

export const getAuthToken = () => localStorage.getItem(AUTH_TOKEN_STORAGE_KEY);

export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_STORAGE_KEY);

export const removeAuthToken = () => localStorage.removeItem(AUTH_TOKEN_STORAGE_KEY);

export const removeRefreshToken = () => localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
