import { sendContactEmail, isMailerConfigured } from '../server/mailer.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed.' });
  }

  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  if (!isMailerConfigured()) {
    return res.status(500).json({ error: 'Email service is not configured.' });
  }

  try {
    await sendContactEmail({ name, email, message });
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Failed to send contact email:', error);
    return res.status(502).json({ error: 'Failed to send message. Please try again later.' });
  }
}
