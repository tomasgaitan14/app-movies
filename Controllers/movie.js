const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Movie = require('../models/Movie');
const mongoose = require('mongoose');


const createMovies = async (req, res) => {
  try {

    const token = req.headers.authorization?.split(' ')[1];

    if (token) {

      try {

      const decodedToken = jwt.verify(token, process.env.SECRET);

      if (!decodedToken || !decodedToken.userId) {
        return res.status(403).json({ message: 'Acceso prohibido. Token no valido' });
      }
  
      
      if (decodedToken.exp * 1000 < Date.now()) {
        return res.status(401).json({ message: 'Token expirado' });
      }
  
      const user = await User.findById(decodedToken.userId);
  
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: 'Acceso prohibido. Solo administradores.' });
      }
  
      
      const movie = await Movie.create(req.body);
  
      res.status(200).json({ message: 'Pelicula creada correctamente', movie });

    } catch(tokenError){
      if (tokenError.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expirado.' });
      } else {
        throw tokenError; 
      }
  }

    } else {
      return res.status(403).json({ message: 'Token no proporcionado'})
    }
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expirado' });
    }

    console.error(error);
    res.status(500).send('Error interno del servidor.');
  }
};

const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find();

    res.status(200).json(movies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en servidor interno' });
  }
};

const searchMovie = async (req, res) => {
  try {
    
    const token = req.headers.authorization?.split(' ')[1];
    
    if (token) {

      try {

      const decodedToken = jwt.verify(token, process.env.SECRET);

      if (decodedToken.exp * 1000 < Date.now()) {
        return res.status(401).json({ message: 'Token expirado.' });
      }

      if (!decodedToken || !decodedToken.userId) {
        return res.status(403).json({ message: 'Acceso prohibido. Token invalido.' });
      }


      const userId = decodedToken.userId;

      const user = await User.findById(userId);

      const userRole = user.role;

      if (userRole !== 'user') { 
        return res.status(403).json({ message: 'Acceso prohibido. Solo usuarios.' });
      }

      const movieId = req.params.movieId;

      if (!mongoose.Types.ObjectId.isValid(movieId)) {
        return res.status(400).json({ message: 'Formato no valido (ID Movie)' });
      }

    
      const movie = await Movie.findById(movieId);

      
      if (!movie) {
        return res.status(404).json({ message: 'Pelicula no encontrada' });
      }
    
      res.status(200).json(movie);
    
    } catch(tokenError){
        if (tokenError.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'Token expirado.' });
        } else {
          throw tokenError; 
        }
    }
      
    } else {
      return res.status(403).json({ message: 'Token no proporcionado'})
    }
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en servidor interno' });
  }
};

const updateMovie = async (req, res) => {
  try {
    
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {
      
      try{

      const decodedToken = jwt.verify(token, process.env.SECRET);

      if (!decodedToken || !decodedToken.userId) {
        return res.status(403).json({ message: 'Acceso prohibido. Token no valido.' });
      }

      
      if (decodedToken.exp * 1000 < Date.now()) {
        return res.status(401).json({ message: 'Token expirado.' });
      }
      
      const userId = decodedToken.userId;

      const user = await User.findById(userId);

      const userRole = user.role;

      if (userRole !== 'admin') {
        return res.status(403).json({ message: 'Access prohibido. Solo administradores.' });
      }

      const movieId = req.params.movieId;

      const existingMovie = await Movie.findById(movieId);
      if (!existingMovie) {
        return res.status(404).json({ message: 'Pelicula no encontrada' });
      }

      
      await Movie.findByIdAndUpdate(movieId, req.body);

      
      const updatedMovie = await Movie.findById(movieId);

      
      res.status(200).json(updatedMovie);
    
    } catch(tokenError){
      if (tokenError.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expirado.' });
      } else {
        throw tokenError; 
      }
  }

    } else {
        return res.status(401).json({ message: 'Token no proporcionado'})
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en servidor interno'});
  }
};

const deleteMovie = async (req, res) => {
  try {
    
    const token = req.headers.authorization?.split(' ')[1];

    if (token) {

      try {

      const decodedToken = jwt.verify(token, process.env.SECRET);

      if (!decodedToken || !decodedToken.userId) {
        return res.status(403).json({ message: 'Acceso prohibido. Token no valido.' });
      }

      if (decodedToken.exp * 1000 < Date.now()) {
        return res.status(401).json({ message: 'Token expirado.' });
      }

      const userId = decodedToken.userId;

      const user = await User.findById(userId);

      const userRole = user.role;

      if (userRole !== 'admin') {
        return res.status(403).json({ message: 'Access prohibido. Solo administradores.' });
      }

      const movieId = req.params.movieId;

      const existingMovie = await Movie.findById(movieId);
      if (!existingMovie) {
        return res.status(404).json({ message: 'Pelicula no encontrada' });
      }
  
      await Movie.findByIdAndDelete(movieId);
  
      res.status(200).json({ message: 'Pelicula eliminada correctamente' });

    } catch(tokenError){
      if (tokenError.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expirado.' });
      } else {
        throw tokenError; 
      }
  }

    } else {
        return res.status(401).json({ message: 'Token no proporcionado.'})
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en servidor interno' });
  }
};

module.exports = { createMovies, getMovies, searchMovie, updateMovie, deleteMovie };