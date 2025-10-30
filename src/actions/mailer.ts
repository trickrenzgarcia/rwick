'use server';

import * as nodemailer from 'nodemailer';

type MailerData = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

export async function sendEmail(data: MailerData) {
  const transporter = nodemailer.createTransport({
    host: process.env.MAILER_HOST,
    port: Number(process.env.MAILER_PORT),
    secure: true,
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASS,
    },
  });

  const mailOptions = {
    from: process.env.MAILER_EMAIL,
    to: process.env.MAILER_EMAIL,
    replyTo: `${data.email}`,
    subject: 'Rwick Portfolio - New Contact Message',
    text: `You have a new message from ${data.name} <${data.email}>`,
    html: `
      <p><strong>From:</strong> ${data.name} &lt;${data.email}&gt;</p>
      <p><strong>Phone:</strong> ${data.phone ? data.phone : 'N/A'}</p>
      <p><strong>Message:</strong> ${data.message}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}
