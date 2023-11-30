const ApiError = require("../error/ApiError");
const galleryService = require("../service/galleryService");

class GalleryController {
  async create(req, res, next) {
    try {
      const { fileName } = req.files;
      const galleryData = await galleryService.create(fileName);
      return res.json(galleryData);
    } catch (error) {
      next(ApiError.BadRequest(error.message));
    }
  }

  async getAll(req, res, next) {
    try {
      let { page, limit } = req.query;
      const galleryData = await galleryService.getAll(page, limit);
      return res.json(galleryData);
    } catch (error) {
      next(ApiError.BadRequest(error.message));
    }
  }

  async getOne(req, res, next) {
    try {
      const { id } = req.params;
      const galleryData = await galleryService.getOne(id);
      return res.json(galleryData);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }

  async remove(req, res, next) {
    try {
      const { id } = req.params;
      const galleryData = await galleryService.remove(id);
      return res.json(galleryData);
    } catch (e) {
      next(ApiError.BadRequest(e.message));
    }
  }
}

module.exports = new GalleryController();
