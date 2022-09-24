import {
  update,
  findOne,
  findAll,
  deleteUser,
  deleteAll,
  create
} from '../controllers/user.controller.js';
import express from 'express';

export const router = express.Router();

router.post('/', create);

router.get('/', findAll);

router.get('/:userId', findOne);

router.put('/:userId', update);

router.delete('/:userId', deleteUser);

router.delete('/', deleteAll);
