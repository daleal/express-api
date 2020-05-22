const express = require('express');
// const models = require('../models');

const router = express.Router();


/* GET home page. */
router.get('/', async (req, res) => {
  // const users = await models.user.findAll();
  res.json({ title: 'Express' });
});

module.exports = router;
