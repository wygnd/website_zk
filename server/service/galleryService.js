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

}

module.exports = new GalleryService();