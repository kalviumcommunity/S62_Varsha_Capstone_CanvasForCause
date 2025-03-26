require("dotenv").config();
// Import Mongoose to handle MongoDB connections
const mongoose = require("mongoose");

// Database Connection: Establish a connection to MongoDB database
const connectDatabase = async () => {
  try {
    // Connect to MongoDB using the database URI from environment variables
    if (!process.env.MONGODB_URI) {
      return console.log(
        "Database connection Failure...",
        process.env.MONGODB_URI
      );
    }
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1);
  }
};

module.exports = connectDatabase;
