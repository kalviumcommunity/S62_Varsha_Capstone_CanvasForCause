require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// Imported database connection function
const connectDatabase = require('./config/database.js');
const authRoutes = require('./routes/authRoutes.js');
const artworkRoutes = require('./routes/artworkRoutes.js');
const commentRoutes = require('./routes/commentRoutes.js');
const userRoutes = require('./routes/userRoutes.js');

const app = express();

// Initialize database connection using the imported connection function
connectDatabase();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/artwork', artworkRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/user', userRoutes);


app.get('/', (req,res)=>{
  return res.status(200).send("Welcome to CanvasForCause");
})

const PORT = process.env.PORT||8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}, http://localhost:${PORT}`);
});