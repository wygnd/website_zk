const ApiError = require("../error/ApiError");
const { MainBlock } = require("../models/models");
const mainBlockService = require("../service/mainBlockService");

class mainBlockController {

    async create(req, res, next) {
        try {
            const { title, desc, buttonVisible, textButton, linkButton, galleryId } = req.body;
            const blockData = await mainBlockService.create(title, desc, buttonVisible, textButton, linkButton, galleryId);
            return res.json(blockData);
        } catch (error) {
            next(ApiError.BadRequest(error.message))
        }
    }

    async save(req, res, next) {
        try {
            const {id, title, desc, buttonVisible, textButton, linkButton, galleryId } = req.body;
            const blockData = await mainBlockService.save(id, title, desc, buttonVisible, textButton, linkButton, galleryId);
            return res.json(blockData);
        } catch (error) {
            next(ApiError.BadRequest(error.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const blockData = await mainBlockService.getAll();
            return res.json(blockData);
        } catch (error) {
            next(ApiError.BadRequest(error.message));
        }
    }

    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const blockData = await mainBlockService.getByID(id);
            return res.json(blockData);
        } catch (error) {
            next(ApiError.BadRequest(error.message));
        }
    }

    async remove(req, res, next) {
        try {
            const { id } = req.params;
            const blockData = await mainBlockService.removeItem(id);
            return res.json(blockData);
        } catch (error) {
            next(ApiError.BadRequest(error.message));
        }
    }

}

module.exports = new mainBlockController();