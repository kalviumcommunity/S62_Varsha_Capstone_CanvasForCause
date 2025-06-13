const mongoose = require('mongoose');
const cloudinary = require('../config/cloudinary.js');
const Artwork = require('../models/ArtWork.js');


const convertToBoolean = (value) => {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }
    return Boolean(value);  
}
// Database Write: Create new artwork document in MongoDB with user details
const createArtwork = async (req, res) => {
  try {
    const { title, description, story, imageUrl, cloudinaryId, isDigital } = req.body;
    if (!title || typeof title !== 'string' || title.trim() === '') {
        return res.status(400).json({
          success: false,
          message: 'Title is required and must be a valid string'
        });
    }
    
    if (title.trim().length > 100) {
        return res.status(400).json({
          success: false,
          message: 'Title cannot exceed 100 characters'
      });
    }
  
    if (!imageUrl || typeof imageUrl !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Valid image URL is required'
      });
    }
        if (description && typeof description !== 'string') {
        return res.status(400).json({
          success: false,
          message: 'Description must be a valid string'
        });
    }
    
    if (story && typeof story !== 'string') {
        return res.status(400).json({
          success: false,
          message: 'Story must be a valid string'
        });
    }

    if (cloudinaryId && typeof cloudinaryId !== 'string') {
      return res.status(400).json({
      success: false,
      message: 'Invalid Cloudinary ID format'
    });
  }

    const convertedIsDigital = convertToBoolean(isDigital);
    
    // Create new artwork
    const newArtwork = new Artwork({
        title: title.trim(),
        description: description ? description.trim() : '',
        story: story ? story.trim() : '',
        imageUrl,
        cloudinaryId: cloudinaryId || null, // Use the cloudinaryId from the request
        creator: req.user.id,
        isDigital: convertedIsDigital
    });
    
    await newArtwork.save();
    
    res.status(201).json({
      success: true,
      message: 'Artwork created successfully',
      data: newArtwork
    });
  } catch (error) {
    console.error('Create artwork error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error creating artwork' 
    });
  }
};


// Database Read: Retrieve all artworks with creator details
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

// Database Read: Fetch single artwork by its unique identifier
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


// Database Write: Update existing artwork details
const updateArtwork = async (req, res) => {
  try {
    const artworkId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(artworkId)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid artwork ID format'
      });
}
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
// Database Write: Toggle like status for an artwork
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
      await artwork.save();
      
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

const getUserArtworks = async (req, res) => {
  try {
    const artworks = await Artwork.find({ creator: req.user.id })
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

const deleteArtwork = async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id);
    
    if (!artwork) {
      return res.status(404).json({
        success: false,
        message: 'Artwork not found'
      });
    }
    
    if (artwork.creator.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      });
    }
    
    // Delete image from Cloudinary if it exists
    if (artwork.cloudinaryId) {
      try {
        await cloudinary.uploader.destroy(artwork.cloudinaryId);
      } catch (cloudinaryError) {
        console.error('Failed to delete image from Cloudinary:', cloudinaryError);
        // Continue with artwork deletion even if Cloudinary deletion fails
      }
    }
    
    await Artwork.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'Artwork deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error deleting artwork' 
    });
  }
};

const uploadArtworkImage = async (req, res) => {
  try {
    const { imageData } = req.body;
    
    if (!imageData) {
      return res.status(400).json({
        success: false,
        message: 'Image data required'
      });
    }
    // Validate image size (10MB limit for base64 data)
    const sizeInBytes = Buffer.byteLength(imageData, 'utf8');
    if (sizeInBytes > 10 * 1024 * 1024) {
      return res.status(400).json({
        success: false,
        message: 'Image data too large. Maximum size is 10MB'
      });
    }
    // Validate base64 format
    if (!imageData.match(/^data:image\/(png|jpg|jpeg|gif|webp);base64,/)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid image format. Only PNG, JPG, JPEG, GIF, and WebP are allowed'
      });
    }

    // Ensure imageData is in proper base64 format
    let base64Data = imageData;
    if (!imageData.startsWith('data:image/')) {
      base64Data = `data:image/png;base64,${imageData}`;
    }

    // Upload to Cloudinary
    let result;
    try {
      result = await cloudinary.uploader.upload(base64Data, {
        folder: 'canvas-for-cause',
        public_id: `artwork_${req.user.id}_${Date.now()}`,
        resource_type: 'image',
        timeout: 60000 // 60 second timeout
      });
    } catch (cloudinaryError) {
      console.error('Cloudinary upload failed:', cloudinaryError);
      return res.status(500).json({
        success: false,
        message: 'Image upload failed. Please try again.'
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Image uploaded successfully',
      data: {
        imageUrl: result.secure_url,
        cloudinaryId: result.public_id
      }
    });
  } catch (error) {
    console.error('Upload image error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error uploading image'
    });
  }
};




module.exports = {createArtwork, getAllArtworks, getArtworkById, updateArtwork, toggleLike, getUserArtworks, deleteArtwork, uploadArtworkImage};