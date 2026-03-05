/**
 * @module api
 * Authenticated Axios instance used by all dashboard API services.
 *
 * Interceptor behaviour:
 *  - On 401: attempts a single token refresh via /auth/refresh-token.
 *  - While a refresh is in-flight, subsequent 401 requests are queued
 *    and replayed once the refresh succeeds.
 *  - On refresh failure: dispatches 'session-expired' so AuthContext
 *    can clear the user state and redirect to /login.
 */
import axios from 'axios';
import { authService } from './authService';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Do not retry on refresh token endpoint or login
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/refresh-token') &&
      !originalRequest.url.includes('/auth/login')
    ) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return api(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Call refresh endpoint
        await authService.refreshAccessToken();

        processQueue(null);
        return api(originalRequest);
      } catch (err) {
        processQueue(err, null);

        // Dispatch event so AuthContext can log user out
        window.dispatchEvent(new Event('session-expired'));
        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
