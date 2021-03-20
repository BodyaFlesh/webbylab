const express = require('express');
const router = express.Router();
const { getMovie, getMovies, updateMovie, createMovie, deleteMovie } = require('./movie.controller');

//all
router.get('/', getMovies);

//get one movie
router.get('/:id', getMovie);

//create movie
router.post('/', createMovie);

//TODO update method
router.put('/:id', updateMovie);

//remove movie
router.delete('/:id', deleteMovie);


module.exports = router;