import { io, Socket } from 'socket.io-client';
import { IRawData } from '../store/vehicleSlice';

class SocketService {
  private socket: Socket | null = null;

  connect() {
    this.socket = io('http://localhost:3000', {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    this.socket.on('connect', () => {
      console.log('Connected to WebSocket server');
    });

    this.socket.on('connect_error', (error) => {
      console.error('WebSocket connection error:', error);
    });

    this.socket.on('disconnect', (reason) => {
      console.warn('WebSocket disconnected:', reason);
    });

    this.socket.on('reconnect_attempt', () => {
      console.log('Attempting to reconnect...');
    });

    this.socket.on('reconnect', (attemptNumber) => {
      console.log('WebSocket reconnected after', attemptNumber, 'attempts');
    });
  }

  subscribeToVehicle(plate: string) {
    this.socket?.emit('subscribeToVehicle', { plate });
  }

  unsubscribeFromVehicle(plate: string) {
    this.socket?.emit('unsubscribeFromVehicle', { plate });
  }

  onVehicleData(callback: (data: IRawData) => void) {
    this.socket?.on('vehicleData', callback);
  }

  disconnect() {
    this.socket?.disconnect();
  }
}

export default new SocketService();
