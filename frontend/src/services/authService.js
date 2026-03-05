/**
 * @module authService
 * @description API service for authentication flows.
 * All methods use the authenticated `api` Axios instance (with refresh-token interceptors).
 */
import api from './api';

export const authService = {
  /**
   * Register a new user account.
   * @param {{ name: string, email: string, password: string }} userData
   * @returns {Promise<{ data: { user: object } }>}
   */
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Something went wrong';
      throw new Error(message);
    }
  },

  /**
   * Log in an existing user.
   * @param {{ email: string, password: string }} userData
   * @returns {Promise<{ data: { user: object } }>}
   */
  login: async (userData) => {
    try {
      const response = await api.post('/auth/login', userData);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Login failed: ' + error.message;
      throw new Error(message);
    }
  },

  /**
   * Log out the current user and invalidate server-side session.
   * @returns {Promise<void>}
   */
  logout: async () => {
    try {
      const response = await api.post('/auth/logout');
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Logout failed: ' + error.message;
      throw new Error(message);
    }
  },

  /**
   * Fetch the currently authenticated user's profile.
   * Returns a 401 if unauthenticated — used as the primary auth check on app load.
   * @returns {Promise<{ data: object }>}
   */
  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Not authenticated';
      throw new Error(message);
    }
  },

  /**
   * Exchange a refresh token for a new access token.
   * @returns {Promise<{ data: { accessToken: string } }>}
   */
  refreshAccessToken: async () => {
    try {
      const response = await api.post('/auth/refresh-token');
      return response.data;
    } catch {
      throw new Error('Session expired');
    }
  },

  /**
   * Check whether the current session cookie is valid.
   * @returns {Promise<{ data: { authenticated: boolean } }>}
   */
  validateSession: async () => {
    try {
      const response = await api.get('/auth/validate-session');
      return response.data;
    } catch {
      return { data: { authenticated: false } };
    }
  },

  /**
   * Update account details (name, email, etc.).
   * @param {Partial<{ name: string, email: string }>} data
   * @returns {Promise<{ data: object }>}
   */
  updateAccount: async (data) => {
    try {
      const response = await api.patch('/auth/update-account', data);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to update account';
      throw new Error(message);
    }
  },

  /**
   * Change the authenticated user's password.
   * @param {{ currentPassword: string, newPassword: string }} data
   * @returns {Promise<{ success: boolean }>}
   */
  changePassword: async (data) => {
    try {
      const response = await api.post('/auth/change-password', data);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to change password';
      throw new Error(message);
    }
  },
};
