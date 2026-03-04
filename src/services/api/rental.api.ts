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
   * Get rental details by ID
   */
  getById: (id: string) => {
    return httpClient.get<ApiResponse>(`/rentals/${id}`);
  },
};
