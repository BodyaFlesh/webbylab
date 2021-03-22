const express = require('express');
const router = express.Router();
const { getMovie, getMovies, createMovie, deleteMovie, importMovies } = require('./movie.controller');

//all
router.get('/', getMovies);

//get one movie
router.get('/:id', getMovie);

//create movie
router.post('/', createMovie);

//import movies
router.post('/import', importMovies);

//remove movie
router.delete('/:id', deleteMovie);


module.exports = router;