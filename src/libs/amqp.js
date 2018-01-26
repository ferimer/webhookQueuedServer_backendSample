'use strict';

const amqp = require('amqplib');

module.exports = function messageQueueManager(config) {
  let open = amqp.connect(config);

  return {
    recvRPCMessage: (rpcQueue, onmsg) => {
      let channel = null;
      open
      .then(conn => conn.createChannel())
      .then(ch => {
        channel = ch;
        return channel.assertQueue(rpcQueue, {
          autoDelete: true,
          deadLetterExchange: 'deadEx'
        });
      })
      .then(q => {
        channel.bindQueue(rpcQueue, 'webhook', rpcQueue);
        channel.consume(q.queue, msg => {
          onmsg(JSON.parse(msg.content), res => {
            channel.sendToQueue(msg.properties.replyTo, new Buffer(JSON.stringify(res)), {
              correlationId: msg.properties.correlationId
            });
            channel.ack(msg);
          });
        }, { noAck: false });
      });
    }
  };
};
