module.exports = {
    needAuthorization: (req, res, next) => {
        return req.isAuthenticated() ?
            next() :
            res.status(401).send();
    }
}