const express = require('express');
const requireLogIn = require('../middleware/requireLogIn');

const router = express.Router();


router.get('/open-endpoint', async (request, response) => response.json({ success: true, payload: 'Free endpoint!' }));

router.get('/closed-endpoint', requireLogIn, async (request, response) => response.json({ success: true, payload: request.currentUser.email }));

module.exports = router;
