const { Gallery } = require('../models/models');
const ApiError = require('../error/ApiError');
const galleryService = require('../service/galleryService');

class GalleryController {
    async create(req, res, next) {
        try {
            const { fileName } = req.files;
            const galleryData = await galleryService.create(fileName);
            return res.json(galleryData);
        } catch (error) {
            next(ApiError.BadRequest(error.message));
        }
    }

    async getAll(req, res, next) {
        try {
            let { limit, page } = req.query;
            const galleryData = galleryService.getAll(limit, page);
            return res.json(galleryData);
        } catch (error) {
            next(ApiError.BadRequest(error.message));

        }
    }

    async getOne(req, res) {
        const { id } = req.params;
        const galleryData = galleryService.getOne(id);
        return res.json(galleryData);
    }
}

module.exports = new GalleryController();