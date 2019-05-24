'use strict';
const bcrypt = require('bcrypt');
const crypto = require('crypto');

const config = require('../config/passport');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    activation: DataTypes.STRING,
    status: DataTypes.BOOLEAN
  }, {});
  User.associate = (models) => {
    User.beforeCreate(async (user, options) => {
      const hash = await bcrypt.hash(user.password, config.userPasswordSaltRounds);
      user.status = false;
      user.password = hash;
      user.activation = crypto.randomBytes(20).toString('hex');
    });
    User.beforeUpdate(async (user, options) => {
      if (user.changed('password')) {
        const hash = await bcrypt.hash(user.password, config.userPasswordSaltRounds);
        user.password = hash;
      }
    });
  };
  return User;
};