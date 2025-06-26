import express from 'express';
import cors from 'cors';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { typeDefs } from './graphql/typeDefs';
import { resolvers } from './graphql/resolvers';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { setupSocket } from './socket';
import { verifyToken } from './auth/auth';

const PORT = process.env.PORT || 4000;

async function startServer() {
  const app = express();
  app.use(cors());
  app.use(express.json());

  // Create HTTP server for Socket.io
  
  const httpServer = createServer(app);

  // Apollo Server
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await apolloServer.start();

  // Apollo middleware with context for authentication

  (app.use as any)(
    '/graphql',
    async (req: any, res: any, next: any) => {
      const token = req.headers.authorization || '';
      (req as any).user = verifyToken(token);
      next();
    },
    expressMiddleware(apolloServer, {
      context: async ({ req }) => ({
        user: (req as any).user,
      }),
    })
  );

  // Socket.io setup
  const io = new SocketIOServer(httpServer, {
    cors: {
      origin: '*',
    },
  });
  setupSocket(io);

  httpServer.listen(Number(PORT), '0.0.0.0', () => {
    console.log(` Server ready at http://localhost:${PORT}/graphql`);
    console.log(` Socket.io running on port ${PORT}`);
  });
}

startServer();
