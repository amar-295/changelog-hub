/**
 * @module useWorkspace
 * @description TanStack Query hooks for workspace data fetching and mutations.
 * Provides automatic caching, deduplication, and optimistic updates.
 */
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { workspaceService } from '@/services/workspaceService';
import toast from 'react-hot-toast';

/** Query key factory for workspace. */
export const workspaceKeys = {
  all: ['workspace'],
  details: () => ['workspace', 'details'],
  metrics: () => ['workspace', 'metrics'],
};

/**
 * Fetches workspace details.
 */
export function useWorkspace() {
  return useQuery({
    queryKey: workspaceKeys.details(),
    queryFn: async () => {
      const response = await workspaceService.getWorkspaceDetails();
      return response.data;
    },
    staleTime: 60_000, // 1 minute
  });
}

/**
 * Fetches workspace metrics (subscriber count, release count, etc.).
 */
export function useWorkspaceMetrics() {
  return useQuery({
    queryKey: workspaceKeys.metrics(),
    queryFn: async () => {
      const response = await workspaceService.getWorkspaceMetrics();
      return response.data;
    },
    staleTime: 30_000,
  });
}

/**
 * Mutation to update workspace settings with optimistic UI.
 */
export function useUpdateWorkspace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => workspaceService.updateWorkspace(data),
    onSuccess: (response) => {
      toast.success('Settings saved!');
      // Update the cached workspace data
      queryClient.setQueryData(workspaceKeys.details(), response.data);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to save settings');
    },
  });
}
