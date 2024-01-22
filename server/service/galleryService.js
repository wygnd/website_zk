const {Gallery} = require("../models/models");
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');

class GalleryService {

  async create(img, user) {
    const fileParse = path.parse(img.name);
    const fileExtentionInst = fileParse.ext;
    let fileName = uuid.v4();
    img.mv(path.resolve(__dirname, '..', 'static', (`${fileName + fileExtentionInst}`)));
    // sharp(img.data)
    //   .resize(150)
    //   .toFile(path.resolve(__dirname, '..', 'static', (`${fileName}_thumbnail.webp`)))
    //   .then(info => console.log(info))
    //   .catch(err => {
    //     return err;
    //   });
    //
    // sharp(img.data)
    //   .resize(300)
    //   .toFile(path.resolve(__dirname, '..', 'static', (`${fileName}_medium.webp`)))
    //   .then(info => console.log(info))
    //   .catch(err => {
    //     return err;
    //   });

    const galleryData = await Gallery.create({file_name: `${fileName + fileExtentionInst}`, author_id: user.id});

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
    return gallery;
  }

  async remove(id) {
    const image = await Gallery.findByPk(id);
    let errorDelete = {};
    fs.unlink(path.resolve(__dirname, '..', 'static', sizeImage.full), err => {
      if(err) errorDelete = {...errorDelete, err};
    })
    // fs.unlink(path.resolve(__dirname, '..', 'static', sizeImage.medium), err => {
    //   if(err) errorDelete = {...errorDelete, err};
    // })
    // fs.unlink(path.resolve(__dirname, '..', 'static', sizeImage.thumbnail), err => {
    //   if(err) errorDelete = {...errorDelete, err};
    // })
    const galleryData = await Gallery.destroy({where: {id}});
    return {galleryData, errorDelete};
  }

}

module.exports = new GalleryService();