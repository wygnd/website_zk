const {Gallery} = require("../models/models");
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');
const crypto = require("crypto");
const {mkdir} = require('node:fs/promises');
const ApiError = require("../error/ApiError");
const sharp = require('sharp');


class GalleryService {

  createProjectFolderPath(hashLine) {
    const first2Letters = hashLine.substring(0, 2);
    const second2Letters = hashLine.substring(2, 4);

    return {
      projectFolder: path.resolve(__dirname, '..', 'static', first2Letters, second2Letters),
      first2Letters,
      second2Letters
    }
  }

  deleteFolderRecursive(directoryPath, file_name) {
    if(fs.existsSync(directoryPath)) {
      fs.readdirSync(directoryPath).forEach((file, index) => {
        const curPath = path.join(directoryPath, file);
        if(fs.lstatSync(curPath).isDirectory()) {
          // recurse
          this.deleteFolderRecursive(curPath, file_name);
        } else {
          // delete file
          const {name} = path.parse(curPath);
          const fileNameWithoutExtAndSize = name.split('_'[0])[0];
          if(fileNameWithoutExtAndSize === file_name) {
            fs.unlinkSync(curPath);
          }
        }
      });
      fs.rmdirSync(directoryPath);
    }
  };

  async create(img, user_id) {
    const fileParse = path.parse(img.name);
    const fileExtInst = fileParse.ext.replace('.', '');
    const fileExt = ".webp";
    const fileHashLine = img.md5;
    const {projectFolder} = this.createProjectFolderPath(fileHashLine);
    let fileName = fileHashLine;

    if(!fs.existsSync(projectFolder)) {
      try {
        fs.mkdir(projectFolder,
          {recursive: true},
          (err) => {
            if(err) {
              throw err;
            }
          });
      } catch(err) {
        throw ApiError.BadRequest(err);
      }
    }
    await sharp(img.data)
      .resize({
          width: 300,
          fit: "cover"
        }
      )
      .webp({
        quality: 100,
        lossless: true,
        nearLossless: true
      })
      .toFile(`${projectFolder}/${fileName}_300${fileExt}`)
      .catch((err) => {
        return err;
      });
    await sharp(img.data)
      .resize({
        width: 150,
        fit: "cover"
      })
      .webp({
        quality: 100,
        lossless: true,
        nearLossless: true
      })
      .toFile(`${projectFolder}/${fileName}_150${fileExt}`)
      .catch((err) => {
        return err;
      });
    await sharp(img.data)
      .resize({
        width: 1024,
        fit: "cover"
      })
      .webp({
        quality: 100,
        lossless: true,
        nearLossless: true
      })
      .toFile(`${projectFolder}/${fileName}_1024${fileExt}`)
      .catch((err) => {
        return err;
      });
    await sharp(img.data)
      .webp({
        quality: 100,
        lossless: true,
        nearLossless: true
      })
      .toFile(`${projectFolder}/${fileName + fileExt}`)
      .catch((err) => {
        return err;
      });
    const galleryData = await Gallery.create({file_name: fileName, file_ext: fileExt, author_id: user_id});
    return {
      galleryData,
      message: "Изображение успешно загружено"
    };
  }

  async getAll(page, limit) {
    page = page || 1;
    limit = limit || 12;
    let offset = page * limit - limit;
    const gallery = await Gallery.findAndCountAll({
      offset: offset,
      limit: Number(limit),
    });

    return gallery;
  }

  async getOne(id) {
    const gallery = await Gallery.findByPk(id);
    if(!gallery) {
      throw ApiError.BadRequest(`Изображения с id=${id} не найдено`);
    }
    return gallery;
  }

  async remove(id) {
    const image = await Gallery.findByPk(id);
    const {projectFolder, first2Letters, second2Letters} = this.createProjectFolderPath(image.file_name);
    if(!image) {
      throw ApiError.BadRequest(`Изображения с id=${image.id} не найдено`);
    }

    this.deleteFolderRecursive(path.resolve(projectFolder, '..'), image.file_name);
    const galleryData = await Gallery.destroy({where: {id}});
    let message = "";
    if(galleryData) {
      message = "Изображение успешно удалено";
    } else {
      message = "Что-то пошлно не так";
    }
    return {message, galleryData, errorDelete};
  }

}

module.exports = new GalleryService();