const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    console.log('Contact form submission:', { name, email, subject, message });

    res.json({ 
      message: 'Thank you for your message! We will get back to you soon.',
      success: true 
    });

  } catch (error) {
    res.status(500).json({ 
      message: 'Error sending message',
      success: false 
    });
  }
});

module.exports = router;