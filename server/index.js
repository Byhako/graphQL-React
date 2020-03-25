import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './data/schema';
import { resolvers } from './data/resolvers';

import dotenv from 'dotenv';
dotenv.config({ path: 'var.env' });
import jwt from 'jsonwebtoken';

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    // get token
    const token = req.headers.authorization;
    if (token !== 'null') {
      try {
        // Verity token to the client
        const userCurrent = await jwt.verify(token, process.env.secret);
        req.userCurrent = userCurrent;
        return { userCurrent };
      } catch (error) {
        console.error(error);
      }
    }
  }
});

server.applyMiddleware({ app });

app.listen({ port: 5050 }, () => console.log('Server run in port 5050'));
