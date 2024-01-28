const ApiError = require("../error/ApiError");
const sequelize = require('sequelize');
const {Tours, Gallery} = require("../models/models");
const {Op} = require("sequelize");

class TourService {
	async create(tour_name, textButton, linkButton, galleryId) {
		const allTours = await Tours.findAndCountAll();
		const candidate = await Tours.findOne({where: {tour_name}});
		if(candidate) {
			throw ApiError.BadRequest('Запись с таким именем уже существует');
		}
		const dataGallery = await Gallery.findByPk(galleryId);
		if(!dataGallery) {
			throw ApiError.BadRequest('Такого изображения не найдено');
		}
		return await Tours.create({tour_name, textButton, linkButton, galleryId, order:  allTours.count + 1})
	}

	async getOne(id) {
		const dataTour = await Tours.findByPk(id);
		if(!dataTour) {
			throw ApiError.BadRequest(`Записи с таким id-${id} не обнаружено`);
		}
		return dataTour;
	}

	async getAll() {
		return await Tours.findAll({
			where: {
				order: {[Op.ne]: 0}
			},
			order: [
				['order', 'asc']
			]
		});
	}

	async change(id, galleryId, args) {
		const tour = await Tours.findByPk(id);
		const image = await Gallery.findByPk(galleryId);
		if(!tour) {
			throw ApiError.BadRequest(`Записи с таким id-${id} не обнаружено`);
		}
		if(!image) {
			throw ApiError.BadRequest(`Изображения с id=${galleryId} не найдено`);
		}
		await tour.update({galleryId, ...args})
		await tour.save();
		return tour;
	}

	async removeTour(id) {
		const tour = await Tours.destroy({where: {id}});
		if(tour) {
			return {message: "Итем удален успешно"};
		} else {
			return {message: "Что-то пошло не так"};
		}
	}
}

module.exports = new TourService();