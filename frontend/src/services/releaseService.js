/**
 * @module releaseService
 * @description API service for release CRUD operations (dashboard).
 * All methods use the authenticated `api` Axios instance.
 */
import api from './api';

export const releaseService = {
  /**
   * Create a new release.
   * @param {{ title: string, content: string, category: string, status?: string }} releaseData
   * @returns {Promise<{ data: object }>}
   */
  createRelease: async (releaseData) => {
    try {
      const response = await api.post('/releases/', releaseData);
      return response.data;
    } catch (error) {
      console.error('Error creating release:', error);
      throw error;
    }
  },

  /**
   * Fetch all releases for the current workspace with optional filters.
   * @param {{ page?: number, limit?: number, status?: string, search?: string }} params
   * @returns {Promise<{ data: { releases: Array, pagination: object } }>}
   */
  getAllReleases: async (params) => {
    try {
      const response = await api.get('/releases/', { params });
      return response.data;
    } catch (error) {
      console.error('Error fetching releases:', error);
      throw error;
    }
  },

  /**
   * Fetch a single release by its ID.
   * @param {string} id - Release document ID.
   * @returns {Promise<{ data: object }>}
   */
  getReleaseById: async (id) => {
    try {
      const response = await api.get(`/releases/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching release:', error);
      throw error;
    }
  },

  /**
   * Partially update a release.
   * @param {string} id - Release document ID.
   * @param {Partial<{title: string, content: string, category: string, status: string}>} releaseData
   * @returns {Promise<{ data: object }>}
   */
  updateRelease: async (id, releaseData) => {
    try {
      const response = await api.patch(`/releases/${id}`, releaseData);
      return response.data;
    } catch (error) {
      console.error('Error updating release:', error);
      throw error;
    }
  },

  /**
   * Permanently delete a release.
   * @param {string} id - Release document ID.
   * @returns {Promise<{ success: boolean }>}
   */
  deleteRelease: async (id) => {
    try {
      const response = await api.delete(`/releases/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting release:', error);
      throw error;
    }
  },

  /**
   * Publish a draft or archived release.
   * @param {string} id - Release document ID.
   * @returns {Promise<{ data: object }>}
   */
  publishRelease: async (id) => {
    try {
      const response = await api.patch(`/releases/${id}/publish`);
      return response.data;
    } catch {
      throw new Error('Failed to publish release');
    }
  },

  /**
   * Unpublish (archive) a published release.
   * @param {string} id - Release document ID.
   * @returns {Promise<{ data: object }>}
   */
  unpublishRelease: async (id) => {
    try {
      const response = await api.patch(`/releases/${id}/unpublish`);
      return response.data;
    } catch {
      throw new Error('Failed to unpublish release');
    }
  },
};
