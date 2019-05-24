'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tasks', [{
        id: 1,
        name: 'Create seed',
        description: 'Need to create example seed',
        userId: 1,
      },
      {
        id: 2,
        name: 'Create second task',
        description: 'Need to create second task for example',
        userId: 1,
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tasks', null, {});
  }
};