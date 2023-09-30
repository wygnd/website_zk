const ApiError = require('../error/ApiError');
const { Tours, Gallery } = require('../models/models');
const tourService = require('../service/tourService');

class ToursController {
    async createTour(req, res, next) {
        try {
            const { name, textButton, linkButton, galleryId } = req.body;
            const dataTour = await tourService.create(name, textButton, linkButton, galleryId);
            res.json(dataTour);
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const dataTour = await tourService.getOne(id);
            return res.json(dataTour);
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const dataTour = await tourService.getAll();
            return res.json(dataTour);
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async changeTour(req, res, next) {
        try {
            const { id, name, textButton, linkButton, galleryId } = req.body;
            const dataTour = await tourService.change(id, name, textButton, linkButton, galleryId);
            return res.json(dataTour);
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async removeTour(req, res, next) {
        try {
            const { id } = req.params;
            const dataTour = await tourService.remove(id);
            if (dataTour) {
                return res.json({ message: "Запись удалена успешна", dataTour });
            } else {
                return res.json({ message: "Что-то пошло не так", dataTour });
            }
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
}

module.exports = new ToursController();