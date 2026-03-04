import { httpClient } from '@/utils/httpClient';
import { RegisterDto, LoginDto, RefreshTokenDto, ApiResponse } from '@goride/shared';

/**
 * Authentication API Service
 */
export const authApi = {
  /**
   * Register a new account
   */
  register: (data: RegisterDto) => {
    return httpClient.post<ApiResponse>('/auth/register', data);
  },

  /**
   * Login to account
   */
  login: (data: LoginDto) => {
    return httpClient.post<ApiResponse>('/auth/login', data);
  },

  /**
   * Get current user profile
   */
  getProfile: () => {
    return httpClient.get<ApiResponse>('/auth/profile');
  },

  /**
   * Refresh access token
   */
  refreshToken: (data: RefreshTokenDto) => {
    return httpClient.post<ApiResponse>('/auth/refresh', data);
  },

  /**
   * Check API health
   */
  checkHealth: () => {
    return httpClient.get<ApiResponse>('/auth/health');
  },
};
