const ApiError = require('../error/ApiError');
const tourService = require('../service/tourService');

class ToursController {
    async createTour(req, res, next) {
        try {
            const { tour_name, textButton, linkButton, galleryId } = req.body;
            const dataTour = await tourService.create(tour_name, textButton, linkButton, galleryId);
            res.json(dataTour);
        } catch (error) {
            next(error)
        }
    }

    async getOne(req, res, next) {
        try {
            const { id } = req.params;
            const dataTour = await tourService.getOne(id);
            return res.json(dataTour);
        } catch (error) {
            next(error)
        }
    }

    async getAll(req, res, next) {
        try {
            const dataTour = await tourService.getAll();
            return res.json(dataTour);
        } catch (error) {
            next(error)
        }
    }

    async changeTour(req, res, next) {
        try {
            const { id, galleryId, ...args } = req.body;
            const dataTour = await tourService.change(id, galleryId, args);
            return res.json(dataTour);
        } catch (error) {
            next(error)
        }
    }

    async removeTour(req, res, next) {
        try {
            const { id } = req.params;
            const dataTour = await tourService.removeTour(id);
            return res.json(dataTour);
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new ToursController();