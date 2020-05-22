const express = require('express');

const auth = require('./routes/auth');
const examples = require('./routes/examples');

const router = express.Router();

router.use('/', auth);
router.use('/examples', examples);

module.exports = router;
