const ApiError = require("../error/ApiError");
const {Settings, Gallery, Sizes} = require("../models/models");
const {Op} = require("sequelize");

class SettingsService {
  async create(metaKey, metaValue) {
    const candidate = await Settings.findAll({
      where: {
        metaKey: {
          [Op.startsWith]: `${metaKey}`,
        },
      },
    });
    if(candidate.length !== 0) {
      const dataSettings = await Settings.create({
        metaKey: `${metaKey}-${candidate.length + 1}`,
        metaValue,
      });
      return dataSettings;
    }
    const dataSettings = await Settings.create({metaKey, metaValue});
    return dataSettings;
  }

  async changeLogo(id) {
    const dataSettings = await Settings.findOne({where: {metaKey: "logo"}});
    const imageData = await Gallery.findByPk(id);
    if(!imageData) {
      throw ApiError.BadRequest("Такого изображения не существует");
    }
    if(!dataSettings) {
      const dataLogo = await Settings.create({
        metaKey: "logo",
        metaValue: imageData.id,
      });
      return dataLogo;
    }
    dataSettings.metaValue = imageData.id;
    await dataSettings.save();
    return dataSettings;
  }

  async findBeforeName(name) {
    const dataSettings = await Settings.findAll({
      where: {
        metaKey: {
          [Op.startsWith]: `${name}`,
        },
      },
    });
    if(!dataSettings) {
      throw ApiError.BadRequest(`Настроект начинающиеся на ${name} не найдено`);
    }
    return dataSettings;
  }

  async remove(metaKey) {
    const dataSettings = await Settings.destroy({where: {metaKey}});
    if(dataSettings) {
      return {message: "Итем удален успешно", dataSettings};
    } else {
      return {message: "Что-то пошло не так", dataSettings};
    }
  }

  async changePhone(metaKey, metaValue) {
    const candidate = await Settings.findOne({where: {metaKey}});
    if(!candidate) {
      throw ApiError.BadRequest("Такого поля не существует");
    }

    candidate.metaValue = metaValue;
    await candidate.save();
    return candidate;
  }

  async findOne(metaKey) {
    const candidate = await Settings.findOne({where: {metaKey}});
    if(!candidate) throw ApiError.BadRequest(`Такой записи ${metaKey} не существует`);
    return candidate;
  }

  async changeOne(metaKey, metaValue) {
    const [candidate, isCreated] = await Settings.findOrCreate({where: {metaKey}, defaults: {metaValue}});
    if(!isCreated) {
      await candidate.update({metaValue});
      await candidate.save();
    }
    return candidate;
  }

  async getAllSettings() {
    const response = await Settings.findAll();
    if(!response) {
      return ApiError.BadRequest("Записей не найдено");
    }
    return response;
  }
}

module.exports = new SettingsService();
