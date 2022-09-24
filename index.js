import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { router } from './routes/user.routes.js';

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use('/users', router);
app.use(express.json());

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
