require('dotenv').config();// Import Mongoose to handle MongoDB connections
const mongoose = require('mongoose');

// Database Connection: Establish a connection to MongoDB database
const connectDatabase = () => {
  // Connect to MongoDB using the database URI from environment variables
  mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('MongoDB Connected Successfully');
    })
    .catch((error) => {
      console.error('MongoDB Connection Error:', error);
    });
};

module.exports = connectDatabase;