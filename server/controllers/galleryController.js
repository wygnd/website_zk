const { Gallery } = require('../models/models');
const ApiError = require('../error/ApiError');
const uuid = require('uuid');
const pathN = require('path');
const { off } = require('process');
const { where } = require('sequelize');

class GalleryController {
    async create(req, res, next) {
        try {
            const { path } = req.files;
            let fileName = uuid.v4() + ".png";
            path.mv(pathN.resolve(__dirname, '..', 'static', fileName));
            const gallery = await Gallery.create({ path: fileName })
            return res.json(gallery);
        } catch (error) {
            next(ApiError.badRequest(error.message))
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
            next(ApiError.badRequest(error.message))
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