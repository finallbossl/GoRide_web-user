import { httpClient } from '@/utils/httpClient';
import { ApiResponse, MotorbikeFilterDto } from '@goride/shared';

/**
 * Motorbike API Service
 */
export const motorbikeApi = {
  /**
   * List all motorbikes with optional filters
   */
  getAll: (filters?: MotorbikeFilterDto) => {
    return httpClient.get<ApiResponse>('/motorbikes', { params: filters as any });
  },

  /**
   * Get motorbike details by ID
   */
  getById: (id: string) => {
    return httpClient.get<ApiResponse>(`/motorbikes/${id}`);
  },
};
