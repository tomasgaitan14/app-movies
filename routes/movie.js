const express = require('express');
const { createMovies, getMovies, searchMovie, updateMovie, deleteMovie } = require('../Controllers/movie');

const router = express.Router();

router.post('/createMovies',createMovies);
router.get('/getMovies',getMovies);
router.get('/searchMovie/:movieId', searchMovie);
router.put('/updateMovie/:movieId', updateMovie);
router.delete('/deleteMovie/:movieId', deleteMovie);

module.exports = router;