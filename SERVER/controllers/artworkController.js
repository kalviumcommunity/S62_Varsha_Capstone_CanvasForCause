const Artwork = require('../models/ArtWork.js');

const convertToBoolean = (value) => {
    if (typeof value === 'boolean') return value;
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }
    return Boolean(value);
};

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

module.exports = {createArtwork, getAllArtworks, getArtworkById};