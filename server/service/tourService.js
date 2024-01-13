const ApiError = require("../error/ApiError");
const { Tours, Gallery } = require("../models/models");

class TourService {
    async create(name, textButton, linkButton, galleryId) {
        const candidate = await Tours.findOne({ where: { name } });
        if (candidate) {
            throw ApiError.badRequest('Запись с таким именем уже существует');
        }
        const dataGallery = await Gallery.findByPk(galleryId);
        if (!dataGallery) {
            throw ApiError.badRequest('Такого изображения не найдено');
        }
        const tour = await Tours.create({ name, textButton, linkButton, galleryId })
        return tour;
    }

    async getOne(id) {
        const dataTour = await Tours.findByPk(id);
        if (!dataTour) {
            throw ApiError.badRequest(`Записи с таким id-${id} не обнаружено`);
        }
        return dataTour;
    }

    async getAll() {
        const dataTour = await Tours.findAll();
        return dataTour;
    }

    async change(id, name, textButton, linkButton, galleryId) {
        const tour = await Tours.findByPk(id);
        if (!tour) {
            throw ApiError.badRequest(`Записи с таким id-${id} не обнаружено`);
        }
        tour.name = name;
        tour.textButton = textButton;
        tour.linkButton = linkButton;
        tour.galleryId = galleryId;
        await tour.save();
        return tour;
    }

    async remove(id) {
        const tour = await Tours.destroy({ where: { id } });
        if (tour) {
            return { message: "Итем удален успешно" };
        } else {
            return { message: "Что-то пошло не так" };
        }
    }
}

module.exports = new TourService();