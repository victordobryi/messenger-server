import User from '../models/user.model.js';
import { v4 as uuidv4 } from 'uuid';

export const create = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  const user = new User({
    username: req.body.username,
    online: true,
    id: uuidv4(),
    socketId: req.body.socketId,
  });

  User.create(user, (err, data) => {
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

export const findOne = (req, res) => {
  User.findById(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error retrieving User with id ' + req.params.userId,
        });
      }
    } else res.send(data);
  });
};

export const update = (req, res) => {
  console.log(req.body);
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!',
    });
  }

  User.updateById(req.params.userId, new User(req.body), (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: 'Error updating User with id ' + req.params.userId,
        });
      }
    } else res.send(data);
  });
};

export const deleteUser = (req, res) => {
  User.remove(req.params.userId, (err, data) => {
    if (err) {
      if (err.kind === 'not_found') {
        res.status(404).send({
          message: `Not found User with id ${req.params.userId}.`,
        });
      } else {
        res.status(500).send({
          message: 'Could not delete User with id ' + req.params.userId,
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};

export const deleteAll = (req, res) => {
  User.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all users.',
      });
    else res.send({ message: `All users were deleted successfully!` });
  });
};
