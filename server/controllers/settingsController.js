const settingsService = require("../service/settingsService");

class SettingsController {
  async create(req, res, next) {
    try {
      const {metaKey, metaValue} = req.body;
      const responseSettings = await settingsService.create(metaKey, metaValue);
      return res.json(responseSettings);
    } catch(error) {
      next(error);
    }
  }

  async changeLogo(req, res, next) {
    try {
      const {id} = req.params;
      const responseSettings = await settingsService.changeLogo(id);
      return res.json(responseSettings);
    } catch(error) {
      next(error);
    }
  }

  async findBeforeName(req, res, next) {
    try {
      const {name} = req.params;
      const responseSettings = await settingsService.findBeforeName(name);
      return res.json(responseSettings);
    } catch(error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
        const settings = await settingsService.getAllSettings();
        return res.json(settings);
    }catch(e) {
      next(e);
    }
  }

  async remove(req, res, next) {
    try {
      const {metaKey} = req.params;
      const responseSettings = await settingsService.remove(metaKey);
      return res.json(responseSettings);
    } catch(error) {
      next(error);
    }
  }

  async changePhone(req, res, next) {
    try {
      const {metaKey, metaValue} = req.body;
      const response = await settingsService.changePhone(metaKey, metaValue);
      return res.json(response);
    } catch(error) {
      next(error);
    }
  }

  async findOne(req, res, next) {
    try {
      const {metaKey} = req.params;
      const response = await settingsService.findOne(metaKey);
      return res.json(response);
    } catch(error) {
      next(error);
    }
  }

  async changeOne(req, res, next) {
    try {
      const {metaKey, metaValue} = req.body;
      const response = await settingsService.changeOne(metaKey, metaValue);
      return res.json(response);
    } catch(error) {
      next(error);
    }
  }
}

module.exports = new SettingsController();
