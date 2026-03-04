import { httpClient } from '@/utils/httpClient';
import { ApiResponse } from '@goride/shared';

/**
 * Payment API Service
 */
export const paymentApi = {
  /**
   * Get payment details for a specific rental
   */
  getByRentalId: (rentalId: string) => {
    return httpClient.get<ApiResponse>(`/payments/rental/${rentalId}`);
  },
};
