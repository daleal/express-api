const models = require('../models');
const helpers = require('../helpers');

module.exports = async (request, response, next) => {
  request.currentUser = null;

  // Get data from JWT
  const authString = request.header('Authorization');

  if (authString) {
    // Get JWT from auth string
    const jwt = authString.replace('Bearer ', '');

    // Decode the JWT
    const payload = helpers.jwt.decode(jwt);

    if (payload) {
      const { id } = payload;
      request.currentUser = await models.user.findByPk(id);
    }
  }

  await next();
};
