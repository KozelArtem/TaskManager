'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Tags', [{
        id: 1,
        name: 'Sequelize',
      },
      {
        id: 2,
        name: 'People',
      },
      {
        id: 3,
        name: 'Life',
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Tags', null, {});
  }
};