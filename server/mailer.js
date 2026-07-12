import nodemailer from 'nodemailer';

export const RECIPIENT_EMAIL = 'oussamaanis2005@gmail.com';

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

let transporter = null;
if (GMAIL_USER && GMAIL_APP_PASSWORD) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD,
    },
  });
} else {
  console.error('GMAIL_USER or GMAIL_APP_PASSWORD is not set — contact form emails will not be sent.');
}

export const isMailerConfigured = () => Boolean(transporter);

export async function sendContactEmail({ name, email, message }) {
  if (!transporter) {
    throw Object.assign(new Error('Email service is not configured.'), { statusCode: 500 });
  }

  await transporter.sendMail({
    from: `"${name} via Portfolio Site" <${GMAIL_USER}>`,
    to: RECIPIENT_EMAIL,
    replyTo: email,
    subject: `New portfolio inquiry from ${name}`,
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br/>')}</p>`,
  });
}
