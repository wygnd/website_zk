const ApiError = require('../error/ApiError');
const { Tours, Gallery } = require('../models/models');

class ToursController {
    async create(req, res, next) {
        try {
            const { name, description, image } = req.body;
            const candidate = await Tours.findOne({ where: { name } });
            if (candidate) {
                return next(ApiError.badRequest('Запись с таким именем уже существует'));
            }
            const gallery = await Gallery.findOne({ where: { image } })
            const tour = await Tours.create({ name, description, image: gallery.id })
            res.json(tour);
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const tours = await Tours.findAll();
            return res.json(tours)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
}

module.exports = new ToursController();