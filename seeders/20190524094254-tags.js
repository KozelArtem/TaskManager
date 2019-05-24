'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tags', [{
        id: 1,
        name: 'Sequelize',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now())
      },
      {
        id: 2,
        name: 'People',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now())
      },
      {
        id: 3,
        name: 'Life',
        createdAt: new Date(Date.now()),
        updatedAt: new Date(Date.now())
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tags', null, {});
  }
};