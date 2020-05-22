// RegEx
const EMAIL_REGEX = /^\w+[\w-.]*@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/;

// User stuff
const PASSWORD_SALT = 10;

module.exports = { EMAIL_REGEX, PASSWORD_SALT };
