import { httpClient } from '@/utils/httpClient';
import { ApiResponse } from '@goride/shared';

/**
 * User API Service
 */
export const userApi = {
  /**
   * Get current user profile information
   */
  getProfile: () => {
    return httpClient.get<ApiResponse>('/users/profile');
  },

  /**
   * Update user profile
   */
  updateProfile: (id: string, data: any) => {
    return httpClient.put<ApiResponse>(`/users/${id}`, data);
  },
};
