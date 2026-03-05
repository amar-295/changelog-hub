/**
 * @module subscriberService
 * @description API service for subscriber management (dashboard).
 * All methods use the authenticated `api` Axios instance.
 */
import api from './api';

export const subscriberService = {
  /**
   * Fetch a paginated list of subscribers for the current workspace.
   * @param {{ page?: number, limit?: number, status?: string }} params
   * @returns {Promise<{ data: { subscribers: Array, pagination: object } }>}
   */
  getAllSubscribers: async (params = {}) => {
    const response = await api.get('/subscribers', { params });
    return response.data;
  },

  /**
   * Permanently delete a subscriber by ID.
   * @param {string} id - Subscriber document ID.
   * @returns {Promise<{ success: boolean, message: string }>}
   */
  deleteSubscriber: async (id) => {
    const response = await api.delete(`/subscribers/${id}`);
    return response.data;
  },
};
