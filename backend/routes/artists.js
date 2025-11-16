const express = require('express');
const router = express.Router();
const Artist = require('../models/Artist');

// Get all artists
router.get('/', async (req, res) => {
  try {
    const artists = await Artist.find({ status: 'active' }).sort({ createdAt: -1 });
    res.json(artists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get featured artists
router.get('/featured', async (req, res) => {
  try {
    const artists = await Artist.find({ featured: true, status: 'active' }).limit(3);
    res.json(artists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single artist
router.get('/:id', async (req, res) => {
  try {
    const artist = await Artist.findById(req.params.id);
    if (!artist) {
      return res.status(404).json({ message: 'Artist not found' });
    }
    res.json(artist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;