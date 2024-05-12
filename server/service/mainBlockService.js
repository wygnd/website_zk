const ApiError = require("../error/ApiError");
const {MainBlock, Gallery} = require("../models/models");

class MainBlockService {
	
	async create(title, desc, buttonVisible, textButton, linkButton, galleryId) {
		const image = await Gallery.findByPk(galleryId);
		if(!image) {
			throw ApiError.BadRequest('Такой картинки не найдено');
		}
		return await MainBlock.create({title, desc, buttonVisible, textButton, linkButton, galleryId})
	}
	
	async save(options) {
		try {
			const {id, galleryId} = options
			const image = await Gallery.findByPk(galleryId);
			if(!image) {
				return ApiError.BadRequest('Такой картинки не найдено');
			}
			const data = await MainBlock.findByPk(id)
			if(!data) {
				return ApiError.BadRequest('Такой записи не найдено');
			}
			await data.update(options)
			return data;
		} catch(err) {
			throw ApiError.BadRequest('Что-то пошло не так' + err);
		}
	}
	
	async getAll() {
		return await MainBlock.findAll({
			include: [
				{
					model: Gallery,
				}
			],
			order: [
				["order", "asc"]
			]
		});
	}
	
	async getByID(id) {
		const data = await MainBlock.findByPk(id);
		if(!data) {
			throw ApiError.BadRequest('Такого поста нет');
		}
		return data;
	}
	
	async removeItem(id) {
		const item = await MainBlock.destroy({where: {id}});
		if(item) {
			return {message: "Итем удален успешно"};
		} else {
			return {message: "Что-то пошло не так"};
		}
	}
	
}

module.exports = new MainBlockService();