// RegEx
const EMAIL_REGEX = /^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;

// JSON Web Token stuff
const JWT_DURATION = parseInt(process.env.JWT_DURATION || 3600, 10); // in seconds

// User stuff
const PASSWORD_SALT = 10;

module.exports = { EMAIL_REGEX, JWT_DURATION, PASSWORD_SALT };
