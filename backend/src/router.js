const express = require('express');
const router = express.Router();
const movieController = require('./movies/movies.router');

router.use(express.json());

router.use('/movies', movieController);

module.exports = router;