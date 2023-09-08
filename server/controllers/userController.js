const ApiError = require('../error/ApiError');
const { Users } = require('../models/models');

class UsersController {
    async login(req, res) {

    }

    async check(req, res, next) {
        const { id } = req.query;
        if(!id) {
            return next(ApiError.badRequest('Не указан id'));
        }
        res.json(id);
    }
}

module.exports = new UsersController();