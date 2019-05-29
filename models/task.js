'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {});
  Task.associate = function (models) {
    Task.belongsToMany(models.Tag, {
      through: 'TaskTag',
      as: 'tags',
      foreignKey: 'task_id'
    });
  };
  return Task;
};