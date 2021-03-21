const express = require('express');
const router = express.Router();
const movieRouter = require('./movies/movies.router');
const formatRouter = require('./formats/format.router');
const actorRouter = require('./actors/actor.router');

router.use(express.json());

router.use('/movies', movieRouter);
router.use('/formats', formatRouter);
router.use('/actors', actorRouter);

module.exports = router;