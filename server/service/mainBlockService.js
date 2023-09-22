const ApiError = require("../error/ApiError");
const { MainBlock, Gallery } = require("../models/models");
const { Op, sequelize } = require("sequelize");

class MainBlockService {

    async create(title, desc, buttonVisible, linkButton, galleryId) {
        const image = await Gallery.findByPk(galleryId);
        if (!image) {
            throw ApiError.BadRequest('Такой картинки не найдено');
        }
        const data = await MainBlock.create({ title, desc, buttonVisible, linkButton, galleryId })
        return data;
    }

    async getAll() {
        const data = await MainBlock.findAll({
            include: [{
                model: Gallery,
            }]
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
        try {
            const item = await MainBlock.destroy({ where: { id } });
            if (item) {
                return res.json({ message: "Итем удален успешно" });
            } else {
                res.json({ message: "Что-то пошло не так" });
            }
        } catch (error) {
            next(ApiError.BadRequest(error.message));
        }
    }

}

module.exports = new MainBlockService();