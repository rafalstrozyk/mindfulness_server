import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import bodyParser from 'body-parser';
import session from 'express-session';
import resolvers from './graphql/resolvers';
import typeDefs from './graphql/typeDefs';

const port = 8000;

async function startServer() {
  const app = express();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();
  server.applyMiddleware({ app, path: '/gql' });

  app.use(express.json());

  app.use(cors());
  app.use(cookieParser());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(
    session({ secret: 'secret XD', resave: true, saveUninitialized: true }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  app.use((req, res, next) => {
    next();
  });

  app.listen(port, () => {
    console.log(`server start at http://localhost:${port}`);
  });
}

startServer();
