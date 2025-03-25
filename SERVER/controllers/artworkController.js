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

module.exports = {createArtwork};