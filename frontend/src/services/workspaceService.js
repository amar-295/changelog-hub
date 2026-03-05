/**
 * @module workspaceService
 * @description API service for workspace settings and metrics (dashboard).
 * All methods use the authenticated `api` Axios instance.
 */
import api from './api';

export const workspaceService = {
  /**
   * Fetch full workspace details for the authenticated user.
   * @returns {Promise<{ data: object }>}
   */
  getWorkspaceDetails: async () => {
    const response = await api.get('/workspaces');
    return response.data;
  },

  /**
   * Fetch aggregated workspace metrics (release count, subscriber count, avg engagement).
   * @returns {Promise<{ data: { totalReleases: number, totalSubscribers: number, avgEngagement: number } }>}
   */
  getWorkspaceMetrics: async () => {
    const response = await api.get('/workspaces/metrics');
    return response.data;
  },

  /**
   * Update workspace settings (name, description, subdomain, logo).
   * Sends a multipart/form-data request to support logo file upload.
   * @param {{ name?: string, description?: string, subdomain?: string, logo?: File }} data
   * @returns {Promise<{ success: boolean, data: object }>}
   */
  updateWorkspace: async (data) => {
    const formData = new FormData();
    if (data.name) formData.append('name', data.name);
    if (data.description) formData.append('description', data.description);
    if (data.subdomain) formData.append('subdomain', data.subdomain);
    if (data.logo) formData.append('logo', data.logo);

    const response = await api.put('/workspaces', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
  },
};
