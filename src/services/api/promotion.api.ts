import { httpClient } from '@/utils/httpClient';
import { ApiResponse } from '@goride/shared';

/**
 * Promotion API Service
 */
export const promotionApi = {
  /**
   * List all active promotions
   */
  getAll: () => {
    return httpClient.get<ApiResponse>('/promotions');
  },

  /**
   * Get promotion details by ID
   */
  getById: (id: string) => {
    return httpClient.get<ApiResponse>(`/promotions/${id}`);
  },

  /**
   * Validate and apply a promotion code
   */
  applyCode: (code: string) => {
    return httpClient.get<ApiResponse>(`/promotions/code/${code}`);
  },
};
