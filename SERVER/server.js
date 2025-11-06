require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

// Imported database connection function
const connectDatabase = require('./config/database.js');
const authRoutes = require('./routes/authRoutes.js');
const artworkRoutes = require('./routes/artworkRoutes.js');
const commentRoutes = require('./routes/commentRoutes.js');
const userRoutes = require('./routes/userRoutes.js');
const canvasRoutes = require('./routes/canvasRoutes.js');
const { generalLimiter, authLimiter, canvasLimiter } = require('./middleware/rateLimiters.js');

const app = express();

// Initialize database connection using the imported connection function
connectDatabase();

app.use(generalLimiter);
app.use(cors({
  origin: [
    process.env.FRONTEND_URL 
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));
app.use(express.json({limit:'10mb'}));
app.use(cookieParser());
app.use(helmet());

app.use('/api/auth', authLimiter,authRoutes);
app.use('/api/artwork',artworkRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/user', userRoutes);
app.use('/api/canvas', canvasLimiter, canvasRoutes);


app.get('/', (req,res)=>{
  return res.status(200).send("Welcome to CanvasForCause");
})

const PORT = process.env.PORT||8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}, http://localhost:${PORT}`);
});