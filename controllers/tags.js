module.exports = {
    getById: (req, res, next) => {
        models.Tag.findByPk(req.params.id).then(tag => {
            if (!tag) {
                return next({
                    status: 500,
                    message: 'Can not find tag with id ' + req.params.id
                })
            }
            res.status(200).send(tag);
        }).catch(err => {
            next(err);
        });
    },

    getAll: (req, res, next) => {
        models.Tag.findAll().then(tags => {
            res.status(200).send(tags);
        }).catch(err => {
            next(err);
        })
    },

    create: (req, res, next) => {
        models.Tag.create({
            name: req.body.name,
        }).then(tag => {
            res.status(201).send(tag);
        }).catch(err => {
            next(err);
        });
    },



    updateById: (req, res, next) => {
        const tag = {};
        req.body.name ? tag.name = req.body.name : '';
        models.Tag.update(tag, {
            where: {
                id: req.params.id
            }
        }).then(result => {
            res.status(200).send({
                message: 'Tag was deleted'
            });
        }).catch(err => {
            next(err);
        });
    },

    removeById: (req, res, next) => {
        models.Tag.destroy({
            where: {
                id: req.params.id
            }
        }).then(() => {
            res.status(200).send({
                message: 'Tag was deleted'
            });
        }).catch(err => {
            next(err);
        });
    }

}