require('dotenv').config();
// Import Mongoose to handle MongoDB connections
const mongoose = require('mongoose');

// Database Connection: Establish a connection to MongoDB database
const connectDatabase = async () => {
  try {
    // Connect to MongoDB using the database URI from environment variables
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected Successfully');
  } catch (error) {
    console.error('MongoDB Connection Error:', error);
    process.exit(1);
  }
};

// Export the database connection function to be used in the main application
module.exports = connectDatabase;