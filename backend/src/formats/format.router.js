const express = require('express');
const router = express.Router();
const { getFormats } = require('./format.controller');

//get all
router.get('/', getFormats);

module.exports = router;