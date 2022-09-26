import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { createServer } from 'http';
import { userRouter } from './routes/user.routes.js';
import { messageRouter } from './routes/message.routes.js';
import { Server } from 'socket.io';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();
const server = createServer(app);

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', userRouter);
app.use('/messages', messageRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const io = new Server(server, {
  cors: {
    origin: 'https://messenger-viktar.herokuapp.com/',
    credentials: true,
  },
});

global.onlineUsers = new Map();

io.on('connection', (socket) => {
  global.chatSocket = socket;
  socket.on('add-user', (userId) => {
    onlineusers.set(userId, socket.id);
  });
  socket.on('send-msg', (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit('msg-recieve', data.msg);
    }
  });
});
