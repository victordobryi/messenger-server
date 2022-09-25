import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import { userRouter } from './routes/user.routes.js';
import { messageRouter } from './routes/message.routes.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/users', userRouter);
app.use('/messages', messageRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
