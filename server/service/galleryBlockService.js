const ApiError = require("../error/ApiError");
const { GalleryBlock } = require("../models/models");

class GalleryBlockService {
    async create(galleryId) {
        const data = await GalleryBlock.create({ galleryId })
        return data;
    }

    async getAll() {
        const data = await GalleryBlock.findAll();
        return data;
    }

    async remove(id) {
        console.log(id);
        const dataRemove = await GalleryBlock.destroy({ where: { id } });
        if (dataRemove) {
            return { message: "Итем удален успешно" };
        } else {
            return { message: "Что-то пошло не так" };
        }
    }
}

module.exports = new GalleryBlockService();