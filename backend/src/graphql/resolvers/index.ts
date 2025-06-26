import { PrismaClient } from '../../prisma/client';
import { PubSub } from 'graphql-subscriptions';

const prisma = PrismaClient;
const pubsub = new PubSub();

export const resolvers = {
  Query: {
    events: async () => {
      return prisma.event.findMany({ include: { attendees: true } });
    },
    me: async (_: any, __: any, context: any) => {
      return context.user;
    },
  },
  Mutation: {
    joinEvent: async (_: any, { eventId }: any, context: any) => {
      if (!context.user) throw new Error('Not authenticated');
      const event = await prisma.event.update({
        where: { id: eventId },
        data: {
          attendees: {
            connect: { id: context.user.id },
          },
        },
        include: { attendees: true },
      });
      return event;
    },
    leaveEvent: async (_: any, { eventId }: any, context: any) => {
      if (!context.user) throw new Error('Not authenticated');

      const event = await prisma.event.update({
        where: { id: eventId },
        data: {
          attendees: {

            disconnect: { id: context.user.id },
          },
        },
        include: { attendees: true },
      });
      return event;
    },
  },
  Event: {
    attendees: (parent: { attendees: any[] }) => parent.attendees,
    
    startTime: (parent: { startTime: Date | string | number }) =>

      parent.startTime instanceof Date
        ? parent.startTime.toISOString()
        : parent.startTime,
  },
};
