const express = require('express');
const router = express.Router();
const { getMovie, getMovies, updateMovie, createMovie, deleteMovie, importMovies } = require('./movie.controller');

//all
router.get('/', getMovies);

//get one movie
router.get('/:id', getMovie);

//create movie
router.post('/', createMovie);

//import movies
router.post('/import', importMovies);

//TODO update method
router.put('/:id', updateMovie);

//remove movie
router.delete('/:id', deleteMovie);


module.exports = router;