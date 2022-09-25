import Message from '../models/message.model.js';
import { v4 as uuidv4 } from 'uuid';

export const create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  const message = new Message({
    title: req.body.title,
    message: req.body.message,
    fromUserId: req.body.fromUserId,
    toUserId: req.body.toUserId,
    id: uuidv4(),
  });

  User.create(message, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the user.',
      });
    else res.send(data);
  });
};

export const findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving users.',
      });
    else res.send(data);
  });
};
