const mongoose = require('mongoose');

const CanvasSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  canvasData: {
    type: String, // JSON string containing canvas state
    required: true
  },
  dimensions: {
    width: { type: Number, default: 800 },
    height: { type: Number, default: 600 }
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isPublic: {
    type: Boolean,
    default: false
  },
  savedAsArtwork: {
    type: Boolean,
    default: false
  },
  artworkImageUrl: String,
  cloudinaryId: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  lastModified: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Canvas', CanvasSchema);