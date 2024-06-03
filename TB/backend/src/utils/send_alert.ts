import nodemailer from 'nodemailer';

export async function sendAlert(subject: string, text: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.ALERT_EMAIL,
      pass: process.env.ALERT_EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.ALERT_EMAIL,
    to: process.env.ALERT_RECIPIENT,
    subject,
    text,
  };

  await transporter.sendMail(mailOptions);
}
