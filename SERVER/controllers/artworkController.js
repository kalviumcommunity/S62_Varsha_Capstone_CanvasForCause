const mongoose = require('mongoose');
const Artwork = require('../models/ArtWork.js');


const convertToBoolean = (value) => {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }
    return Boolean(value);
}
// Create a new artwork
const createArtwork = async (req, res) => {
  try {
    const { title, description, story, imageUrl, isDigital } = req.body;
    
    if (!title || title.trim() === '') {
        return res.status(400).json({
          success: false,
          message: 'Title is required'
        });
    }
  
      if (!imageUrl) {
        return res.status(400).json({
          success: false,
          message: 'Image URL is required'
        });
    }

    const convertedIsDigital = convertToBoolean(isDigital);
    
    // Create new artwork
    const newArtwork = new Artwork({
        title: title.trim(),
        description: description ? description.trim() : '',
        story: story ? story.trim() : '',
        imageUrl,
        cloudinaryId: null, // I'll update this later
        creator: req.user.id,
        isDigital: convertedIsDigital
    });
    
    await newArtwork.save();
    
    res.status(201).json({
      success: true,
      message:'Artwork created successfully',
      data: newArtwork
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error creating artwork' 
    });
  }
};

// Get all artworks
const getAllArtworks = async (req, res) => {
  try {
    const artworks = await Artwork.find()
      .populate('creator', 'username avatar')
      .sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: artworks.length,
      data: artworks
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error getting artworks' 
    });
  }
};

// Get a single artwork by ID
const getArtworkById = async (req, res) => {
  try {
    const artworkId = req.params.id;
    
    if (!mongoose.Types.ObjectId.isValid(artworkId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid artwork ID format'
      });
    }
    
    const artwork = await Artwork.findById(artworkId)
    //Relation between entities
      .populate('creator', 'username avatar')
      .populate('likes', 'username');
    
    // Check if artwork exists
    if (!artwork) {
      return res.status(404).json({
        success: false,
        message: 'Artwork not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: artwork
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error getting artwork' 
    });
  }
};


// Update an artwork
const updateArtwork = async (req, res) => {
  try {
    const artworkId = req.params.id;
    const { title, description, story } = req.body;
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Title is required and must be a valid string'
      });
    }

    if (story && typeof story !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Story must be a valid string'
      });
    }

    if (description && typeof description !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Description must be a valid string'
      });
    }
    
    // Find the artwork
    let artwork = await Artwork.findById(artworkId);
    
    // Check if artwork exists
    if (!artwork) {
      return res.status(404).json({
        success: false,
        message: 'Artwork not found'
      });
    }
    
    // Check if user owns the artwork
    if (artwork.creator.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized to update this artwork'
      });
    }
    
    // Update the artwork
    artwork = await Artwork.findByIdAndUpdate(
      artworkId,
      { title, description, story },
      { new: true }
    );
    
    res.status(200).json({
      success: true,
      data: artwork
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error updating artwork' 
    });
  }
};

//Relation between entities
const toggleLike = async (req, res) => {
  try {
      // Validate artwork ID
      const artworkId = req.params.id;
      if (!artworkId || !mongoose.Types.ObjectId.isValid(artworkId)) {
          return res.status(400).json({ 
              success: false, 
              message: 'Invalid artwork ID' 
          });
      }
      // Validate user authentication
      if (!req.user || !req.user.id) {
          return res.status(401).json({ 
              success: false, 
              message: 'Authentication required to like artwork' 
          });
      }
      // Find the artwork
      const artwork = await Artwork.findById(artworkId);
      // Check if artwork exists
      if (!artwork) {
          return res.status(404).json({ 
              success: false, 
              message: 'Artwork not found' 
          });
      }
      // Ensure likes is an array
      if (!artwork.likes || !Array.isArray(artwork.likes)) {
          artwork.likes = [];
      }
      // Check if the artwork has already been liked by this user
      const isLiked = artwork.likes.includes(req.user.id);
      if (isLiked) {
          // Unlike the artwork
          artwork.likes = artwork.likes.filter(
              likeId => likeId.toString() !== req.user.id.toString()
          );
      } else {
          // Like the artwork
          artwork.likes.push(req.user.id);
      }
      // Save the updated artwork
      try {
          await artwork.save();
      } catch (saveError) {
          console.error('Save Artwork Error:', saveError);
          return res.status(500).json({ 
              success: false, 
              message: 'An error occurred while processing your request'
          });
      }
      res.status(200).json({ 
          success: true, 
          data: artwork.likes,
          message: isLiked ? 'Artwork unliked successfully' : 'Artwork liked successfully'
      });
  } catch (error) {
      console.error('Toggle Like Error:', {
          message: error.message,
          artworkId: req.params.id,
          userId: req.user ? req.user.id : 'Unknown'
      });
      res.status(500).json({ 
          success: false, 
          message: 'An error occurred while processing your request'
      });
  }
};

module.exports = {createArtwork, getAllArtworks, getArtworkById, updateArtwork, toggleLike};