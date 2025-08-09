import dotenv from 'dotenv';
import amqp from 'amqplib';
import PlaylistsService from './PlaylistsService.js';
import MailSender from './MailSender.js';
import Listener from './Listener.js';
import config from './utils/config.js';

dotenv.config();

const init = async () => {
  const playlistsService = new PlaylistsService();
  const mailSender = new MailSender();
  const listener = new Listener(playlistsService, mailSender);

  const connection = await amqp.connect(config.rabbitMq.server);
  const channel = await connection.createChannel();

  await channel.assertQueue('export:playlistSongs', {
    durable: true,
  });

  channel.consume('export:playlistSongs', listener.listen, { noAck: true });
};

init();
