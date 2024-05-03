const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    director: {
      type: String,
      required: true,
      trim: true
    },
    genre: {
      type: String,
      required: true,
      trim: true
    },
    releaseYear: {
      type: Number,
      required: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  { timestamps: true }
);

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
