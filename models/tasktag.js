'use strict';
module.exports = (sequelize, DataTypes) => {
  const TaskTag = sequelize.define('TaskTag', {
    task_id: DataTypes.INTEGER,
    tag_id: DataTypes.INTEGER
  }, {});
  TaskTag.associate = function(models) {
    // associations can be defined here
  };
  return TaskTag;
};