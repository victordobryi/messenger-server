import { findAll, create, findOne, deleteAll } from '../controllers/message.controller.js';
import express from 'express';

export const messageRouter = express.Router();

messageRouter.post('/', create);
messageRouter.get('/:fromUserId', findOne);
messageRouter.get('/', findAll);
messageRouter.delete('/', deleteAll);
