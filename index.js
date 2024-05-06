const express = require('express');
const path = require('path');
const connectDB = require('./db');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const movieRoutes = require('./routes/movie');
const cors = require('cors');

const app = express();

const PORT = process.env.PORT || 3000;

connectDB();

app.use(express.json());

app.use(cors({
  origin: ['https://preview-javascript.playcode.io', 'https://playcode.io/javascript', `http://localhost:${PORT}`]
}));

app.use('/auth', authRoutes);

app.use('/movie', movieRoutes);

app.use('/user', userRoutes);

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

module.exports = app;