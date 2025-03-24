const mongoose = require('mongoose');

const ArtworkSchema = new mongoose.Schema({
    title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String
  },
  story: {
    type: String
  },
  imageUrl: {
    type: String,
    required: true
  },
  cloudinaryId: {
    type: String,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  isDigital: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Artwork', ArtworkSchema);