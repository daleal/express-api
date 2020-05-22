'use strict';

const bcrypt = require('bcrypt');

const { PASSWORD_SALT } = require('../constants');

async function buildHash(user) {
  if (user.changed('password')) {
    const salt = await bcrypt.genSalt(PASSWORD_SALT);
    const digest = await bcrypt.hash(user.password, salt);
    user.set('password', digest);
  }
}

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    email: { // Validate email
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg: 'A user already exists with that email.',
      },
      validate: {
        notEmpty: {
          msg: 'An email is required.',
        },
        isEmail: {
          msg: 'A valid email is required.',
        },
      },
    },
    password: DataTypes.STRING,
  }, { underscored: true });

  // Pre-build hooks
  user.beforeCreate(buildHash);
  user.beforeUpdate(buildHash);

  // Check password for specific user
  user.prototype.checkPassword = function checkPassword(password) {
    return bcrypt.compare(password, this.password);
  };

  // Check email and password. Return the user if valid, null if otherwise
  user.authenticate = async (email, password) => {
    const userInstance = await user.findOne({ where: { email } });
    // No user exists with given email
    if (!userInstance) {
      return null;
    }
    // Given password is incorrect
    if (!(await userInstance.checkPassword(password))) {
      return null;
    }
    // Return the user object
    return userInstance;
  };

  return user;
};
