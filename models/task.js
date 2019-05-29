'use strict';
module.exports = (sequelize, DataTypes) => {
  const Task = sequelize.define('Task', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    completed: DataTypes.BOOLEAN,
    completedAt: DataTypes.DATE
  }, {});
  Task.associate = function (models) {
    Task.beforeCreate(async (task, options) => {
      task.completed = false;
    });
    Task.belongsToMany(models.Tag, {
      through: 'TaskTag',
      as: 'tags',
      foreignKey: 'task_id'
    });
  };
  return Task;
};