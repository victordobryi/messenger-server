import { findAll, create } from '../controllers/message.controller.js';
import express from 'express';

export const messageRouter = express.Router();

messageRouter.post('/', create);

messageRouter.get('/', findAll);
