import api from './api';

export const workspaceService = {
  getWorkspaceDetails: async () => {
    const response = await api.get('/workspaces');
    return response.data;
  },

  getWorkspaceMetrics: async () => {
    const response = await api.get('/workspaces/metrics');
    return response.data;
  },

  updateWorkspace: async (data) => {
    // We use FormData for multipart/form-data support (for the logo upload)
    const formData = new FormData();
    if (data.name) formData.append('name', data.name);
    if (data.description) formData.append('description', data.description);
    if (data.subdomain) formData.append('subdomain', data.subdomain);
    if (data.logo) formData.append('logo', data.logo);

    const response = await api.put('/workspaces', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
};
