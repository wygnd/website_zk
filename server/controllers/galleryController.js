const ApiError = require('../error/ApiError');
const galleryService = require('../service/galleryService');
const tokenService = require('../service/tokenService');

class GalleryController {
	async create(req, res, next) {
		try {
			const {file} = req.files;
			const {tokenRef} = req.cookies;
			const userData = await tokenService.validateRefreshToken(tokenRef);
			let resultData = [];
			await Promise.all(file.map(async f => {
				const data = await galleryService.create(f, userData.id);
				resultData.push(data);
			}));
			return res.json(resultData);
		} catch(error) {
			next(ApiError.BadRequest(error.message));
		}
	}
	
	async getAll(req, res, next) {
		try {
			let {page, limit} = req.query;
			const galleryData = await galleryService.getAll(page, limit);
			return res.json(galleryData);
		} catch(error) {
			next(ApiError.BadRequest(error.message));
			
		}
	}
	
	async getOne(req, res, next) {
		try {
			const {id} = req.params;
			const galleryData = await galleryService.getOne(id);
			return res.json(galleryData);
			
		} catch(e) {
			next(ApiError.BadRequest(e.message));
		}
	}
	
	async remove(req, res, next) {
		try {
			const {id} = req.params;
			const galleryData = await galleryService.remove(id);
			return res.json(galleryData);
		} catch(e) {
			next(ApiError.BadRequest(e.message));
		}
	}
}

module.exports = new GalleryController();