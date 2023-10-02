const { Gallery } = require("../models/models");
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');

class GalleryService {

    async create(img) {
        let fileName = uuid.v4() + ".jpg";
        img.mv(path.resolve(__dirname, '..', 'static', fileName));

        const gallery = await Gallery.create({ fileName })
        return gallery;
    }

    async getAll(page, limit) {
        page = page || 1;
        limit = limit || 12;
        let offset = page * limit - limit;
        const gallery = await Gallery.findAndCountAll({
            offset: offset,
            limit: Number(limit),
        });

        return gallery;
    }

    async getOne(id) {
        const gallery = await Gallery.findByPk(id);
        return gallery;
    }

    async remove(id) {
        const image = await Gallery.findByPk(id);
        const errorDelete = {};
        fs.unlink(path.resolve(__dirname, '..', 'static', image.fileName), err => {
            if (err) errorDelete =  err;
        })
        const gallery = await Gallery.destroy({ where: { id } });
        return {gallery, errorDelete};
    }

}

module.exports = new GalleryService();