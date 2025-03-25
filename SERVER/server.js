require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes.js');
const artworkRoutes = require('./routes/artworkRoutes.js');
const commentRoutes = require('./routes/commentRoutes.js');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/artwork', artworkRoutes);
app.use('/api/comment', commentRoutes);


const PORT = process.env.PORT||8080;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}, http://localhost:${PORT}`);
});