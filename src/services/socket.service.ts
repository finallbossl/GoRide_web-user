import { io, Socket } from 'socket.io-client';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://prn-232-be.vercel.app/api/v1';
const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || API_URL.replace('/api/v1', '');

class SocketService {
    private socket: Socket | null = null;

    connect(userId: string) {
        if (this.socket?.connected) return;

        this.socket = io(SOCKET_URL, {
            transports: ['websocket', 'polling'],
            reconnection: true,
        });

        this.socket.on('connect', () => {
            console.log('Successfully connected to socket server with ID:', this.socket?.id);
            console.log('Emitting join_room for user:', userId);
            this.socket?.emit('join_room', userId);
        });

        this.socket.on('disconnect', () => {
            console.log('Disconnected from socket server');
        });
    }

    onReceiveMessage(callback: (message: any) => void) {
        this.socket?.on('receive_message', callback);
    }

    offReceiveMessage() {
        this.socket?.off('receive_message');
    }

    sendMessage(payload: { receiverId?: string; content: string; isAI?: boolean }) {
        console.log('Emitting send_message:', payload);
        this.socket?.emit('send_message', payload);
    }

    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
    }
}

export const socketService = new SocketService();
