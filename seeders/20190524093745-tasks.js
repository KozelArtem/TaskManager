'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tasks', [{
        id: 1,
        name: 'Create seed',
        description: 'Need to create example seed',
        userId: 1,
        completed: false,
        completedAt: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: 2,
        name: 'Create second task',
        description: 'Need to create second task for example',
        userId: 1,
        completed: true,
        completedAt: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tasks', null, {});
  }
};