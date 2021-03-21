const express = require('express');
const router = express.Router();
const { getActors } = require('./actor.controller');

//get all
router.get('/', getActors);

module.exports = router;