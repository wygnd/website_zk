const { model } = require("../db");
const ApiError = require("../error/ApiError");
const { MainBlock, Gallery, Sizes } = require("../models/models");

class MainBlockService {

    async create(title, desc, buttonVisible, textButton, linkButton, galleryId) {
        const image = await Gallery.findByPk(galleryId);
        if (!image) {
            throw ApiError.BadRequest('Такой картинки не найдено');
        }
        const data = await MainBlock.create({ title, desc, buttonVisible, textButton, linkButton, galleryId })
        return data;
    }

    async save(id, title, desc, buttonVisible, textButton, linkButton, galleryId) {
        const image = await Gallery.findByPk(galleryId);
        if (!image) {
            throw ApiError.BadRequest('Такой картинки не найдено');
        }
        const data = await MainBlock.findByPk(id)
        if (!data) {
            throw ApiError.BadRequest('Такой записи не найдено');
        }
        data.title = title;
        data.desc = desc;
        data.buttonVisible = buttonVisible;
        data.textButton = textButton;
        data.linkButton = linkButton;
        data.galleryId = galleryId;
        await data.save();
        return data;
    }

    async getAll() {
        const data = await MainBlock.findAll({
            include: [
                {
                    model: Gallery,
                    include: [
                        { model: Sizes }
                    ]
                }
            ]
        });
        return data;
    }

    async getByID(id) {
        const data = await MainBlock.findByPk(id);
        if (!data) {
            throw ApiError.BadRequest('Такого поста нет');
        }
        return data;
    }

    async removeItem(id) {
        const item = await MainBlock.destroy({ where: { id } });
        if (item) {
            return { message: "Итем удален успешно" };
        } else {
            return { message: "Что-то пошло не так" };
        }
    }

}

module.exports = new MainBlockService();