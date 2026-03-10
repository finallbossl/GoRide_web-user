import { httpClient } from '@/utils/httpClient';
import { ApiResponse } from '@goride/shared';

/**
 * Payment API Service
 */
export const paymentApi = {
  /**
   * Get payment details for a specific rental
  /**
   * Create a PayOS payment link for a rental
   */
  createPaymentLink: (rentalId: string) => {
    return httpClient.post<ApiResponse>('/payment/create-payment-link', { rentalId });
  },
};
