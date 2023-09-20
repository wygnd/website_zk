const { Gallery } = require("../models/models");
const uuid = require('uuid');
const path = require('path');

class GalleryService {

    async create(img) {
        let fileName = uuid.v4() + ".jpg";
        img.mv(path.resolve(__dirname, '..', 'static', fileName));

        const gallery = await Gallery.create({ fileName })
        return gallery;
    }

    async getAll(page, limit) {
        page = page || 1;
        limit = limit || 9;
        let offset = page * limit - limit;
        const gallery = await Gallery.findAndCountAll({
            offset: offset,
            limit: Number(limit),
        });

        return gallery;
    }

    async getOne(id) {
        const gallery = await Gallery.findOne({ where: { id } })
        return gallery;
    }

}

module.exports = new GalleryService();