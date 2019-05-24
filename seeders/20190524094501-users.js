'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      id: 1,
      username: 'test',
      email: 'test@test.com',
      password: '$2b$12$hr6nAbMJyklRlEDQjkLQN.9jagYAMlSeHqxBRMbaS7CxSxESXNNba', // equals to 12345678
      firstName: 'Name',
      lastName: 'Surname',
      activation: 'activationCode',
      status: true,
      createdAt: new Date(Date.now()),
      updatedAt: new Date(Date.now()),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};