import apiClient from '@/api/client';

export const subscriptionService = {
  subscribe: async (email: string): Promise<void> => {
    await apiClient.post('/subscriptions', { email });
  },
  unsubscribe: async (email: string): Promise<void> => {
    await apiClient.delete('/subscriptions', { data: { email } });
  },
};
