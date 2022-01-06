const { append } = require('express/lib/response');

const express = require('express'),
  cors = require('cors'),
  cookieParser = require('cookie-parser'),
  server = express(),
  port = 8000;

server.use(express.json());
server.use(cors());
server.use(cookieParser());
server.use((req, res, next) => {
  console.log(req.url);
  next();
});

server.get('/', (req, res) => {
  res.json({ hello: 'hello!' });
});

server.listen(port, () => {
  console.log(`server start at http://localhost:${port}`);
});
