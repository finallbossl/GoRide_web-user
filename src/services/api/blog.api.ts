import { httpClient } from '@/utils/httpClient';
import { ApiResponse } from '@goride/shared';

/**
 * Blog API Service
 */
export const blogApi = {
  /**
   * List all blog posts
   */
  getAll: () => {
    return httpClient.get<ApiResponse>('/blogs');
  },

  /**
   * Get blog post details by ID
   */
  getById: (id: string) => {
    return httpClient.get<ApiResponse>(`/blogs/${id}`);
  },
};
