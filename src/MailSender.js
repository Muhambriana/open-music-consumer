import nodemailer from 'nodemailer';

class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
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
