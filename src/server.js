import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const server = express();
const port = 8000;

server.use(express.json());

server.use(cors());
server.use(cookieParser());

server.use((req, res, next) => {
  next();
});

server.get('/', (req, res) => {
  res.json({ hello: 'hello!' });
});

server.listen(port, () => {
  console.log(`server start at http://localhost:${port}`);
});
