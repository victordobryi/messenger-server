import {
  update,
  findOne,
  findAll,
  deleteUser,
  deleteAll,
  create,
} from '../controllers/user.controller.js';
import express from 'express';

export const userRouter = express.Router();

userRouter.post('/', create);

userRouter.get('/', findAll);

userRouter.get('/:userId', findOne);

userRouter.put('/:userId', update);

userRouter.delete('/:userId', deleteUser);

userRouter.delete('/', deleteAll);
