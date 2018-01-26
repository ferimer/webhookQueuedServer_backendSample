'use strict';

const config = require('./config');
const amqp = require('./libs/amqp')(config.messageQueue);

amqp.recvRPCMessage('1234567890', (msg, cb) => {
  console.log(msg);

  cb({
    status: 200,
    headers: {
      'X-sample': '1234'
    },
    body: Object.assign({done: 1}, msg.body)
  });
});
