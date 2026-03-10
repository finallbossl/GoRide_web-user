import { httpClient } from '@/utils/httpClient';
import { ApiResponse, CreateRentalDto, RentalFilterDto } from '@goride/shared';

/**
 * Rental API Service
 */
export const rentalApi = {
  /**
   * Create a new rental request
   */
  create: (data: CreateRentalDto) => {
    return httpClient.post<ApiResponse>('/rentals', data);
  },

  /**
   * Get current user's rental history
   */
  getMyRentals: (filters?: RentalFilterDto) => {
    return httpClient.get<ApiResponse>('/rentals/my', { params: filters as any });
  },

  /**
   * Update rental metadata (return details)
   */
  updateMetadata: (id: string, metadata: any) => {
    return httpClient.put<ApiResponse>(`/rentals/${id}/metadata`, metadata);
  },

  /**
   * Get rental by ID
   */
  getById: (id: string) => {
    return httpClient.get<ApiResponse>(`/rentals/${id}`);
  },
};
