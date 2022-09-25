import sql from './db.js';

const Message = function (message) {
  this.title = message.title;
  this.message = message.message;
  this.fromUserId = message.fromUserId;
  this.toUserId = message.toUserId;
  this.id = message.id;
};

Message.create = (newMessage, result) => {
  sql.query('INSERT INTO messages SET ?', newMessage, (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(err, null);
      return;
    }

    console.log('created message: ', { newMessage });
    result(null, { newMessage });
  });
};

Message.getAll = (result) => {
  sql.query('SELECT * FROM messages', (err, res) => {
    if (err) {
      console.log('error: ', err);
      result(null, err);
      return;
    }

    console.log('messages: ', res);
    result(null, res);
  });
};

export default Message;
