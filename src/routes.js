const express = require('express');

const example = require('./routes/example');

const router = express.Router();

router.use('/', example);

module.exports = router;
