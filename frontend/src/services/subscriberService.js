import api from './api';

export const subscriberService = {
  getAllSubscribers: async (params = {}) => {
    const response = await api.get('/subscribers', { params });
    return response.data;
  },

  deleteSubscriber: async (id) => {
    const response = await api.delete(`/subscribers/${id}`);
    return response.data;
  },
};
