const { Gallery, Sizes } = require("../models/models");
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

class GalleryService {

    async create(img) {
        let fileName = uuid.v4();
        img.mv(path.resolve(__dirname, '..', 'static', (`${fileName}.webp`)));
        sharp(img.data)
            .resize(150)
            .toFile(path.resolve(__dirname, '..', 'static', (`${fileName}_thumbnail.webp`)))
            .then(info => console.log(info))
            .catch(err => {
                return err;
            });

        sharp(img.data)
            .resize(300)
            .toFile(path.resolve(__dirname, '..', 'static', (`${fileName}_medium.webp`)))
            .then(info => console.log(info))
            .catch(err => {
                return err;
            });

        const sizeData = await Sizes.create({
            fileName,
            full: `${fileName}.webp`,
            medium: `${fileName}_medium.webp`,
            thumbnail: `${fileName}_thumbnail.webp`
        })
        const galleryData = await Gallery.create({ sizeId: sizeData.id });

        return {
            sizeData,
            galleryData,
            message: "Изображение успешно загружено"
        };
    }

    async getAll(page, limit) {
        page = page || 1;
        limit = limit || 12;
        let offset = page * limit - limit;
        const gallery = await Gallery.findAndCountAll({
            offset: offset,
            limit: Number(limit),
            include: [{
                model: Sizes,
            }]
        });

        return gallery;
    }

    async getOne(id) {
        const gallery = await Gallery.findOne({
            where: {
                id
            },
            include: [{
                model: Sizes,
            }]
        });
        return gallery;
    }

    async remove(id) {
        const image = await Gallery.findByPk(id);
        const sizeImage = await Sizes.findByPk(image.sizeId);
        let errorDelete = {};
        fs.unlink(path.resolve(__dirname, '..', 'static', sizeImage.full), err => {
            if (err) errorDelete = { ...errorDelete, err };
        })
        fs.unlink(path.resolve(__dirname, '..', 'static', sizeImage.medium), err => {
            if (err) errorDelete = { ...errorDelete, err };
        })
        fs.unlink(path.resolve(__dirname, '..', 'static', sizeImage.thumbnail), err => {
            if (err) errorDelete = { ...errorDelete, err };
        })
        const sizeData = await Sizes.destroy({ where: { id: image.sizeId } })
        const galleryData = await Gallery.destroy({ where: { id } });
        return { galleryData, sizeData, errorDelete };
    }

}

module.exports = new GalleryService();