const mongoose = require('mongoose');

const exhibitionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Exhibition title is required'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Description is required']
  },
  startDate: {
    type: Date,
    required: [true, 'Start date is required']
  },
  endDate: {
    type: Date,
    required: [true, 'End date is required']
  },
  image: {
    type: String,
    required: [true, 'Image URL is required']
  },
  status: {
    type: String,
    enum: ['upcoming', 'current', 'past'],
    default: 'upcoming'
  },
  featured: {
    type: Boolean,
    default: false
  },
  location: {
    type: String,
    required: [true, 'Location is required']
  },
  admission: {
    type: String,
    default: 'Free'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Exhibition', exhibitionSchema);