import api from "./api";

export const releaseService = {
  createRelease: async (releaseData) => {
    try {
      const response = await api.post("/releases/", releaseData);
      return response.data;
    } catch (error) {
      console.error("Error creating release:", error);
      throw error;
    }
  },
  getAllReleases: async (params) => {
    try {
      const response = await api.get("/releases/", { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching releases:", error);
      throw error;
    }
  },
  getReleaseById: async (id) => {
    try {
      const response = await api.get(`/releases/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching release:", error);
      throw error;
    }
  },
  updateRelease: async (id, releaseData) => {
    try {
      const response = await api.patch(`/releases/${id}`, releaseData);
      return response.data;
    } catch (error) {
      console.error("Error updating release:", error);
      throw error;
    }
  },
  deleteRelease: async (id) => {
    try {
      const response = await api.delete(`/releases/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting release:", error);
      throw error;
    }
  },
  publishRelease: async (id) => {
    try {
      const response = await api.patch(`/releases/${id}/publish`);
      return response.data;
    } catch {
      throw new Error("Failed to publish release");
    }
  },
};
