const config = {
  rabbitMq: {
    server: process.env.RABBITMQ_SERVER,
  },
  nodemailer: {
    smtpHost: process.env.SMTP_HOST,
    smtpPort: process.env.SMTP_PORT,
    smtpUser: process.env.SMTP_USER,
    smtpPassword: process.env.SMTP_PASSWORD,
  },
};

export default config;
