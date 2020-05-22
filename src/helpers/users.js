'use-strict';

const { EMAIL_REGEX } = require('../constants');

module.exports = {
  name: 'users',
  validate: (requestBody) => {
    if (!(EMAIL_REGEX.test(requestBody.email))) {
      throw new Error('A valid email is required.');
    }
  },
};
