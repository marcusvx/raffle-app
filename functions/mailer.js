import nodemailer from 'nodemailer';

async function sendMail(subject, textContent, htmlContent) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_SERVER,
    port: process.env.SMTP_PORT,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PWD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    if (await transporter.verify()) {
      const result = await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: process.env.EMAIL_TO,
        subject,
        text: textContent,
        html: htmlContent,
      });

      console.log('Message sent: %s', result.messageId);
    }
  } catch (error) {
    console.error(error);
  }
}

export { sendMail };
