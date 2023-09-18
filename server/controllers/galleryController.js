const { Gallery } = require('../models/models');
const ApiError = require('../error/ApiError');
const galleryService = require('../service/galleryService');

class GalleryController {
    async create(req, res, next) {
        try {
            const { fileName } = req.files;
            console.log(req.files);
            const galleryData = await galleryService.create(fileName);
            return res.json(galleryData);
        } catch (error) {
            next(ApiError.BadRequest(error.message));
        }
    }

    async getAll(req, res, next) {
        try {
            let { limit, page } = req.query;
            page = page || 1;
            limit = limit || 9;
            let offset = page * limit - limit;
            const gallery = await Gallery.findAndCountAll({
                offset: offset,
                limit: Number(limit),
            });
            return res.json(gallery);
        } catch (error) {
            next(ApiError.BadRequest(error.message));

        }
    }

    async getOne(req, res) {
        const { id } = req.params;
        const gallery = await Gallery.findOne(
            {
                where: { id },
            }
        )
        return res.json(gallery);
    }
}

module.exports = new GalleryController();