const express = require('express');
const router = express.Router();
const Newsletter = require('../models/Newsletter');

router.post('/', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    const existingSubscriber = await Newsletter.findOne({ email: email.toLowerCase() });
    
    if (existingSubscriber) {
      return res.status(400).json({ message: 'Email already subscribed' });
    }

    const newSubscriber = new Newsletter({
      email: email.toLowerCase()
    });

    await newSubscriber.save();

    res.json({ message: 'Thank you for subscribing!' });

  } catch (error) {
    res.status(500).json({ message: 'Error subscribing to newsletter' });
  }
});

module.exports = router;