import api from './api';

export const authService = {
  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Something went wrong';
      throw new Error(message);
    }
  },

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

  getCurrentUser: async () => {
    try {
      const response = await api.get('/auth/me');
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Not authenticated';
      throw new Error(message);
    }
  },

  refreshAccessToken: async () => {
    try {
      const response = await api.post('/auth/refresh-token');
      return response.data;
    } catch {
      throw new Error('Session expired');
    }
  },

  validateSession: async () => {
    try {
      const response = await api.get('/auth/validate-session');
      return response.data;
    } catch {
      return { data: { authenticated: false } };
    }
  },

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
