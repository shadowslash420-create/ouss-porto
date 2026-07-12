import express from 'express';
import nodemailer from 'nodemailer';

const app = express();
app.use(express.json());

const PORT = process.env.API_PORT || 3001;

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;
const RECIPIENT_EMAIL = 'oussamaanis2005@gmail.com';

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

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  if (!transporter) {
    return res.status(500).json({ error: 'Email service is not configured.' });
  }

  try {
    await transporter.sendMail({
      from: `"${name} via Portfolio Site" <${GMAIL_USER}>`,
      to: RECIPIENT_EMAIL,
      replyTo: email,
      subject: `New portfolio inquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message.replace(/\n/g, '<br/>')}</p>`,
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Failed to send contact email:', error);
    res.status(502).json({ error: 'Failed to send message. Please try again later.' });
  }
});

app.listen(PORT, () => {
  console.log(`Contact API server listening on port ${PORT}`);
});
