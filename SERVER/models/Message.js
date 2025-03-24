const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
    participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
    }],
    createdAt: {
    type: Date,
    default: Date.now
    }
});

const MessageSchema = new mongoose.Schema({
    conversation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Conversation',
    required: true
    },
    sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
    },
    text: {
    type: String,
    required: true,
    trim: true
    },
    read: {
    type: Boolean,
    default: false
    },
    createdAt: {
    type: Date,
    default: Date.now
    }
});

const Message = mongoose.model('Message', MessageSchema);
const Conversation = mongoose.model('Conversation', ConversationSchema);

module.exports = { Message, Conversation };