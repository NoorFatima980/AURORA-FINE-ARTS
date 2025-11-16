const express = require('express');
const router = express.Router();
const Exhibition = require('../models/Exhibition');

// Get all exhibitions
router.get('/', async (req, res) => {
  try {
    const exhibitions = await Exhibition.find().sort({ startDate: 1 });
    res.json(exhibitions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get upcoming exhibitions
router.get('/upcoming', async (req, res) => {
  try {
    const exhibitions = await Exhibition.find({ status: 'upcoming' }).limit(3);
    res.json(exhibitions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single exhibition
router.get('/:id', async (req, res) => {
  try {
    const exhibition = await Exhibition.findById(req.params.id);
    
    if (!exhibition) {
      return res.status(404).json({ message: 'Exhibition not found' });
    }

    res.json(exhibition);
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid exhibition ID' });
    }
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;