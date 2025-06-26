import { io, Socket } from 'socket.io-client';
import { eventStore } from '../store/eventStore';

class SocketManager {
  private socket: Socket | null = null;

  connect() {
    this.socket = io('http://localhost:4000', {
      transports: ['websocket'],
    });

    this.socket.on('connect', () => {
      console.log('Connected to Socket.io server');
    });

    this.socket.on('attendeesUpdate', (data: { attendees: any[] }) => {
      // Update the current event's attendees in real-time
      const currentEvent = eventStore.getState().currentEvent;
      if (currentEvent) {
        eventStore.getState().updateEventAttendees(currentEvent.id, data.attendees);
      }
    });

    this.socket.on('disconnect', () => {
      console.log('Disconnected from Socket.io server');
    });
  }

  joinEvent(eventId: string, userId: string) {
    if (this.socket) {
      this.socket.emit('joinEvent', { eventId, userId });
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export const socketManager = new SocketManager(); 