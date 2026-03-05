import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { subscriberService } from '@/services/subscriberService';
import toast from 'react-hot-toast';

/** Query key factory for subscribers. */
export const subscriberKeys = {
  all: ['subscribers'],
  list: (params) => ['subscribers', 'list', params],
};

/**
 * Fetches paginated subscribers.
 * @param {{ page?: number, limit?: number, status?: string }} params
 */
export function useSubscribers(
  params = { page: 1, limit: 10, status: 'active' }
) {
  return useQuery({
    queryKey: subscriberKeys.list(params),
    queryFn: async () => {
      const response = await subscriberService.getAllSubscribers(params);
      return response.data;
    },
    placeholderData: (prev) => prev, // keep previous data during page changes
    staleTime: 30_000, // 30s before refetch
  });
}

/**
 * Mutation to delete a subscriber with cache invalidation.
 */
export function useDeleteSubscriber() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => subscriberService.deleteSubscriber(id),
    onSuccess: () => {
      toast.success('Subscriber removed successfully');
      queryClient.invalidateQueries({ queryKey: subscriberKeys.all });
    },
    onError: () => {
      toast.error('Failed to remove subscriber');
    },
  });
}
