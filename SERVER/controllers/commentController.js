const Comment = require('../models/Comment.js');
const Artwork = require('../models/ArtWork.js');

// Add a comment to an artwork
const addComment = async (req, res) => {
  try {
    const artworkId = req.params.artworkId;
    const { text } = req.body;

    if (!text || text.trim() === '') {
        return res.status(400).json({
          success: false,
          message: 'Comment text is required'
        });
    }
    
    // Check if artwork exists
    const artwork = await Artwork.findById(artworkId);
    if (!artwork) {
      return res.status(404).json({
        success: false,
        message: 'Artwork not found'
      });
    }
    
    // Create new comment
    const newComment = new Comment({
      text,
      artwork: artworkId,
      user: req.user.id
    });
    
    await newComment.save();
    
    // Get the comment with user details
    const comment = await Comment.findById(newComment._id)
      .populate('user', 'username avatar');
    
    res.status(201).json({
      success: true,
      message:'Comment added successfully',
      data: comment
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error adding comment' 
    });
  }
};

module.exports = {addComment};