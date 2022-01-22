import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/typeDefs';
import authRouter from './Routers/auth';

import './strategies/JwtStrategy';
import './strategies/LocalStrategy';

require('dotenv').config();

const port = 8000;
const dbURL = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wkf0f.mongodb.net/mindfulnes?retryWrites=true&w=majority`;

async function startServer() {
  const app = express();

  app.use(
    cors({
      origin: 'http://localhost:3000',
      methods: 'GET,HEAD,POST,PATCH,DELETE,OPTIONS',
      credentials: true, // required to pass
      allowedHeaders: 'Content-Type, Authorization, X-Requested-With',
    }),
  );

  app.use((req, res, next) => {
    res.header('Content-Type', 'application/json;charset=UTF-8');
    res.header('Access-Control-Allow-Credentials', true);
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept',
    );
    console.log('request');
    next();
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app, path: '/gql' });

  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(bodyParser.json());
  app.use(passport.initialize());

  await mongoose
    .connect(dbURL)
    .then(console.log('db connected'))
    .catch((err) => console.log(err));

  // Routes
  app.use('/auth', authRouter);

  app.listen(port, () => {
    console.log(`server start at http://localhost:${port}`);
  });
}

startServer();
