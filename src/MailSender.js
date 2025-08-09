import nodemailer from 'nodemailer';
import config from './utils/config.js';

class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: config.nodemailer.smtpHost,
      port: config.nodemailer.smtpPort,
      auth: {
        user: config.nodemailer.smtpUser,
        pass: config.nodemailer.smtpPassword,
      },
    });
  }

  sendEmail(targetEmail, content) {
    const message = {
      from: 'Open Music App',
      to: targetEmail,
      subject: 'Playlist Songs Export',
      text: 'Here are the songs in your playlist',
      attachments: [
        {
          filename: 'playlist_songs.json',
          content,
        },
      ],
    };

    return this._transporter.sendMail(message);
  }
}

export default MailSender;
