import { httpClient } from '@/utils/httpClient';
import { ApiResponse } from '@goride/shared';

export const chatApi = {
  getMessages: (receiverId: string) => 
    httpClient.get<ApiResponse>(`/chat/messages/${receiverId}`),
  sendMessage: (receiverId: string, content: string) =>
    httpClient.post<ApiResponse>('/chat/send', { receiverId, content }),
};
