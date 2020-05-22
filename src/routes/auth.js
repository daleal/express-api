const express = require('express');
const models = require('../models');
const helpers = require('../helpers');
const requireLogIn = require('../middleware/requireLogIn');

const router = express.Router();


router.post('/sign-in', async (request, response) => {
  const user = models.user.build(request.body);
  try {
    helpers.users.validate(request.body);
    await user.save({ fields: ['email', 'password'] });
    return response.json({ success: true, payload: user.email });
  } catch (error) {
    return response.json({ success: false, payload: error.message });
  }
});

router.post('/log-in', async (request, response) => {
  const { email, password } = request.body; // Get login data
  try {
    const user = await models.user.authenticate(email, password);
    if (!user) {
      // User credentials invalid
      throw new Error('Invalid email/password combination');
    }
    const token = helpers.jwt.generateJWToken(user.id);
    return response.json({ success: true, payload: token });
  } catch (error) {
    return response.json({ success: false, payload: error.message });
  }
});

router.post('/sample', requireLogIn, async (request, response) => {
  return response.json({ success: true, payload: request.currentUser });
});

module.exports = router;
