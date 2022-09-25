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

  Message.create(message, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the message.',
      });
    else res.send(data);
  });
};

export const findAll = (req, res) => {
  Message.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving messages.',
      });
    else res.send(data);
  });
};

export const findOne = (req, res) => {
  Message.findById(req.params.fromUserId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found User with id ${req.params.fromUserId}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving User with id ' + req.params.fromUserId,
        });
      }
    } else res.send(data);
  });
};
