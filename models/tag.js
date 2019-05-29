'use strict';
module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    name: DataTypes.STRING,
  }, {});
  Tag.associate = function (models) {
    Tag.belongsToMany(models.Task, {
      through: 'TaskTag',
      as: 'tasks',
      foreignKey: 'tag_id'
    });
  };
  return Tag;
};