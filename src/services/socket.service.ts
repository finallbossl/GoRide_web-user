import Pusher from 'pusher-js';

const PUSHER_KEY = process.env.NEXT_PUBLIC_PUSHER_KEY || 'ab3a2b62b6523f45c70f';
const PUSHER_CLUSTER = process.env.NEXT_PUBLIC_PUSHER_CLUSTER || 'ap1';

class SocketService {
    private pusher: Pusher | null = null;
    private channel: any = null;

    connect(userId: string) {
        if (this.pusher) return;

        this.pusher = new Pusher(PUSHER_KEY, {
            cluster: PUSHER_CLUSTER,
            forceTLS: true
        });

        console.log('Connecting to Pusher channel:', userId);
        this.channel = this.pusher.subscribe(userId);

        // Bind connection success
        this.pusher.connection.bind('connected', () => {
            console.log('Successfully connected to Pusher');
        });

        // Handle admin room if necessary (though backend triggers to private userId)
        // If the user is admin, also subscribe to admin-room
        if (userId === 'admin-placeholder' || userId.startsWith('admin')) {
             this.pusher.subscribe('admin-room');
        }
    }

    onReceiveMessage(callback: (message: any) => void) {
        if (this.channel) {
            this.channel.bind('receive_message', callback);
        }
    }

    offReceiveMessage() {
        if (this.channel) {
            this.channel.unbind('receive_message');
        }
    }

    sendMessage(payload: { receiverId?: string; content: string; isAI?: boolean }) {
        // Pusher is used for receiving messages on Serverless. 
        // Sending still happens via standard HTTP API in your other services.
        // If there's a specific need to emit via socket, we keep the signature but explain.
        console.warn('sendMessage via Pusher client is not recommended for Serverless. Use your API instead.');
    }

    disconnect() {
        if (this.pusher) {
            this.pusher.disconnect();
            this.pusher = null;
            this.channel = null;
        }
    }
}

export const socketService = new SocketService();
