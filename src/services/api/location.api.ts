import { httpClient } from '@/utils/httpClient';
import { ApiResponse } from '@goride/shared';

/**
 * Location API Service
 */
export const locationApi = {
    /**
     * List all locations
     */
    getAll: () => {
        return httpClient.get<ApiResponse>('/locations');
    },

    /**
     * Get location details by ID
     */
    getById: (id: number) => {
        return httpClient.get<ApiResponse>(`/locations/${id}`);
    },
};
