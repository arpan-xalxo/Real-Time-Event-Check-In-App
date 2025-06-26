import { Server as SocketIOServer } from 'socket.io';
import { PrismaClient } from '../prisma/client';

export function setupSocket(io: SocketIOServer) {
  io.on('connection', (socket) => {
    // Join event room
    socket.on('joinEvent', async ({ eventId, userId }) => {
      
      socket.join(eventId);
      //  updated attendees

      const event = await PrismaClient.event.findUnique({
        where: { id: eventId },
        include: { attendees: true },

      });

      io.to(eventId).emit('attendeesUpdate', { attendees: event?.attendees || [] });
    });
    // Optionally handle disconnects.
  });
}
