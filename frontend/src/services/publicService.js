import axios from 'axios';

/**
 * Service for public (unauthenticated) API calls.
 * Uses a standalone Axios instance (no auth interceptors needed).
 */
const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  headers: { 'Content-Type': 'application/json' },
});

export const publicService = {
  /**
   * Fetch published releases for a public changelog page.
   * @param {string} subdomain - Workspace subdomain.
   * @returns {Promise<{ workspace: object, releases: Array }>}
   */
  getReleases: async (subdomain) => {
    try {
      const response = await publicApi.get(
        `/public/${encodeURIComponent(subdomain)}/releases`
      );
      return response.data;
    } catch (error) {
      const message =
        error.response?.data?.message || 'Failed to load changelog';
      throw new Error(message);
    }
  },

  /**
   * Subscribe an email to a workspace's changelog updates.
   * @param {string} subdomain - Workspace subdomain.
   * @param {string} email - Subscriber email.
   * @returns {Promise<{ success: boolean, message: string }>}
   */
  subscribe: async (subdomain, email) => {
    try {
      const response = await publicApi.post(
        `/public/${encodeURIComponent(subdomain)}/subscribe`,
        { email }
      );
      return response.data;
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to subscribe';
      throw new Error(message);
    }
  },
};
