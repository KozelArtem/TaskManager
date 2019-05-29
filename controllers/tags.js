const models = require('../models');

module.exports = {
    getById: (id) => {
        return models.Tag.findByPk(id);
    },

    getAll: () => {
        return models.Tag.findAll();
    },

    findByCriteria: (criteria) => {
        return models.Tag.findOne({
            where: {
                criteria
            }
        });
    },

    create: (name) => {
        return models.Tag.create({
            name
        });
    },

    updateById: (id, name) => {
        const tag = {
            id,
            name
        };
        return models.Tag.update(tag, {
            where: {
                id
            }
        });
    },

    removeById: (id) => {
        return models.Tag.destroy({
            where: {
                id
            }
        });
    }

}