import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { userRouter } from './routes/user.routes.js';
import { messageRouter } from './routes/message.routes.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
const server = createServer(app);
// import { sio, connection } from './socket.js';
import { ServerSocket } from './socket.js';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', userRouter);
app.use('/messages', messageRouter);

new ServerSocket(server);
// connection(io);

const socketIOMiddleware = (req, res, next) => {
  req.io = io;
  next();
};

app.use('/api/v1/hello', socketIOMiddleware, (req, res) => {
  req.io.emit('message', `Hello ${req.originalUrl}`);
  res.send('hello world');
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
