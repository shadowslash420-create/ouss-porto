import express from 'express';
import { sendContactEmail, isMailerConfigured } from './mailer.js';

const app = express();
app.use(express.json());

const PORT = process.env.API_PORT || 3001;

app.post('/api/contact', async (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required.' });
  }

  if (!isMailerConfigured()) {
    return res.status(500).json({ error: 'Email service is not configured.' });
  }

  try {
    await sendContactEmail({ name, email, message });
    res.json({ success: true });
  } catch (error) {
    console.error('Failed to send contact email:', error);
    res.status(502).json({ error: 'Failed to send message. Please try again later.' });
  }
});

app.listen(PORT, () => {
  console.log(`Contact API server listening on port ${PORT}`);
});
