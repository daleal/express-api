const express = require('express');
const models = require('../models');
const helpers = require('../helpers');

const router = express.Router();


router.post('/create', async (request, response) => {
  const user = models.user.build(request.body);
  try {
    helpers.users.validate(request.body);
    await user.save({ fields: ['email', 'password'] });
    response.json(user);
  } catch (error) {
    response.json({ errorMessage: error.message });
  }
});

module.exports = router;
