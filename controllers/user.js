module.exports = {
    profile: (req, res, next) => {
        res.status(200).send({
            id: req.user.id,
            email: req.user.email,
            username: req.user.username,
            firstName: req.user.firstName,
            lastName: req.user.lastName
        });
    }
}