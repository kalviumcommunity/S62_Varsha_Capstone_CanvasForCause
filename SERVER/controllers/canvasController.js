const mongoose = require('mongoose');
const Canvas = require('../models/Canvas.js');
const cloudinary = require('../config/cloudinary.js');
const ArtWork = require('../models/ArtWork.js');
// Create new canvas
const createCanvas = async (req, res) => {
  try {
    const { title, canvasData } = req.body;
    
    if (!title || title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Canvas title is required'
      });
    }
    
    if(canvasData){
      try{
        // Check size limit (5MB for canvas data)
        const sizeInBytes = Buffer.byteLength(canvasData, 'utf8');
        if(sizeInBytes > 5 * 1024 * 1024) {
          return res.status(400).json({
          success: false, 
          message: 'Canvas data too large. Maximum size is 5MB'
        });
      }
      JSON.parse(canvasData);
    }
  catch(err){
    return res.status(400).json({success:false, message:'Invalid canvas data format'});
  }
}

    const newCanvas = new Canvas({
      title: title.trim(),
      canvasData: canvasData || '{}',
      creator: req.user.id
    });

    await newCanvas.save();

    res.status(201).json({
      success: true,
      message: 'Canvas created successfully',
      data: newCanvas
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error creating canvas'
    });
  }
};

// Update canvas
const updateCanvas = async (req, res) => {
  try {
    const { title, canvasData } = req.body;
    
    // Validate canvas ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid canvas ID'
      });
    }
    if (canvasData) {
      try {
        // Check size limit (5MB for canvas data)
        const sizeInBytes = Buffer.byteLength(canvasData, 'utf8');
        if(sizeInBytes > 5 * 1024 * 1024) {
          return res.status(400).json({
          success: false, 
          message: 'Canvas data too large. Maximum size is 5MB'
        });
        }
        JSON.parse(canvasData);
      } catch (err) {
        return res.status(400).json({
          success: false, 
          message: 'Invalid canvas data format'
        });
      }
    }
    
    let canvas = await Canvas.findById(req.params.id);
    
    if (!canvas) {
      return res.status(404).json({
        success: false,
        message: 'Canvas not found'
      });
    }
    
    if (canvas.creator.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      });
    }
    
    canvas = await Canvas.findByIdAndUpdate(
      req.params.id,
      { 
        title: title || canvas.title,
        canvasData: canvasData || canvas.canvasData,
        lastModified: new Date()
      },
      { new: true }
    );
    
    res.status(200).json({
      success: true,
      data: canvas
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error updating canvas'
    });
  }
};

// Load canvas
const loadCanvas = async (req, res) => {
  try {
    // Validate canvas ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid canvas ID'
      });
    }

    const canvas = await Canvas.findById(req.params.id)
      .populate('creator', 'username');
    
    if (!canvas) {
      return res.status(404).json({
        success: false,
        message: 'Canvas not found'
      });
    }
    
    // Check if user can access this canvas (owner or public)
    if (!canvas.isPublic && canvas.creator._id.toString() !== req.user.id) {
        return res.status(403).json({
        success: false,
        message: 'Access denied'
      });
    }
    res.status(200).json({
      success: true,
      data: canvas
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error loading canvas'
    });
  }
};

// Delete canvas
const deleteCanvas = async (req, res) => {
  try {
    // Validate canvas ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid canvas ID'
      });
    }

    const canvas = await Canvas.findById(req.params.id);
    
    if (!canvas) {
      return res.status(404).json({
        success: false,
        message: 'Canvas not found'
      });
    }
    
    if (canvas.creator.toString() !== req.user.id) {
      return res.status(401).json({
        success: false,
        message: 'Not authorized'
      });
    }
    
    await Canvas.findByIdAndDelete(req.params.id);
    
    res.status(200).json({
      success: true,
      message: 'Canvas deleted successfully'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error deleting canvas'
    });
  }
};

// Save canvas as image
const saveCanvasImage = async (req, res) => {
  try {
    const { imageData, title, description, story, isDigital = true, canvasId } = req.body;
    
    if (!imageData || typeof imageData !== 'string') {
      return res.status(400).json({
        success: false,
        message: 'Invalid image data format'
      });
    }
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

    if (!title || title.trim() === '') {
      return res.status(400).json({
        success: false,
        message: 'Title is required when saving canvas as artwork'
      });
    }

    // Ensure imageData is in proper base64 format
    let base64Data = imageData;
     base64Data = base64Data.replace(/:base64,/, ';base64,');

     if (!base64Data.startsWith('data:image/')) {
      base64Data = `data:image/png;base64,${base64Data}`;
    } else if (!base64Data.includes(';base64,')) {
      // Handle cases where it's data:image/png but missing ;base64,
      base64Data = base64Data.replace('data:image/png', 'data:image/png;base64,');
    }
    
    // Upload to Cloudinary
    let result;
    try {
      result = await cloudinary.uploader.upload(base64Data, {
        folder: 'canvas-for-cause',
        public_id: `artwork_${req.user.id}_${Date.now()}`,
        resource_type: 'auto',
        timeout: 60000 
      });
    } catch (cloudinaryError) {
      console.error('Cloudinary upload failed:', cloudinaryError);
      return res.status(500).json({
        success: false,
        message: 'Image upload failed. Please try again.'
      });
    }
        // Create artwork entry
    const newArtwork = new ArtWork({
      title: title.trim(),
      description: description?.trim() || '',
      story: story?.trim() || '',
      imageUrl: result.secure_url,
      cloudinaryId: result.public_id,
      creator: req.user.id,
      isDigital
    });
    
    await newArtwork.save();
    
    // Update canvas if canvasId provided
    if (canvasId) {
      await Canvas.findByIdAndUpdate(canvasId, {
        savedAsArtwork: true,
        artworkImageUrl: result.secure_url
      });
    }
    
    res.status(200).json({
      success: true,
      message: 'Canvas saved as artwork successfully',
      data: {
        imageUrl: result.secure_url,
        cloudinaryId: result.public_id,
        title: title.trim(),
        description: description?.trim() || '',
        story: story?.trim() || '',
        isDigital
      }
    });
  } catch (error) {
    console.error('Save canvas image error:', error);
    console.error('Error details:', error.message);
    console.error('Stack trace:', error.stack);
    res.status(500).json({
      success: false,
      message: 'Server error saving image'
    });
  }
};

// Get user canvases
const getUserCanvases = async (req, res) => {
  try {
    const canvases = await Canvas.find({ creator: req.user.id })
      .sort({ lastModified: -1 })
      .select('-canvasData'); // Don't send large canvas data
    
    res.status(200).json({
      success: true,
      count: canvases.length,
      data: canvases
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error getting canvases'
    });
  }
};

module.exports = {
  createCanvas,
  updateCanvas,
  loadCanvas,
  deleteCanvas,
  saveCanvasImage,
  getUserCanvases
};