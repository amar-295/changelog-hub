import api from "./api";

export const authService = {
  register: async (userData) => {
    try {
      const response = await api.post("/users/register", userData);
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Something went wrong";
      throw new Error(message);
    }
  },

  login: async (userData) => {
    try {
      const response = await api.post("/users/login", userData);
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Login failed: " + error.message;
      throw new Error(message);
    }
  },

  logout: async () => {
    try {
      const response = await api.post("/users/logout");
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || "Logout failed: " + error.message;
      throw new Error(message);
    }
  },

  getCurrentUser: async () => {
    try {
      const response = await api.get("/users/current-user");
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || "Not authenticated";
      throw new Error(message);
    }
  },

  refreshToken: async () => {
    try {
      const response = await api.post("/users/refresh-token");
      return response.data;
    } catch (error) {
      throw new Error("Session expired");
    }
  },
};
