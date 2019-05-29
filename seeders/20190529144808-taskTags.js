'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('TaskTags', [{
      id: 1,
      tag_id: 1,
      task_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 2,
      tag_id: 1,
      task_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 3,
      tag_id: 2,
      task_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }, {
      id: 4,
      tag_id: 3,
      task_id: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('TaskTags', null, {});
  }
};