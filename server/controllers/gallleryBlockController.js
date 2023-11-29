const ApiError = require("../error/ApiError");
const galleryBlockService = require("../service/galleryBlockService");

class GallleryBlockController {
  async create(req, res, next) {
    try {
      const { id } = req.body;
      const imageData = await galleryBlockService.create(id);
      return res.json(imageData);
    } catch (error) {
      next(ApiError.BadRequest(error.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const imageData = await galleryBlockService.getAll();
      return res.json(imageData);
    } catch (error) {
      next(ApiError.BadRequest(error.message));
    }
  }

  async remove(req, res, next) {
    try {
      const { id } = req.params;
      const imageData = await galleryBlockService.remove(id);
      return res.json(imageData);
    } catch (error) {
      next(ApiError.BadRequest(error.message));
    }
  }
}

module.exports = new GallleryBlockController();
