const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Tours = sequelize.define('tours', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    textButton: { type: DataTypes.STRING },
    linkButton: { type: DataTypes.STRING },
})

const Gallery = sequelize.define('gallery', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const Sizes = sequelize.define('sizes', {
    fileName: { type: DataTypes.STRING },
    full: { type: DataTypes.STRING },
    medium: { type: DataTypes.STRING },
    thumbnail: { type: DataTypes.STRING }
})

const Users = sequelize.define('users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: 'ADMIN' }
})

const Tokens = sequelize.define('tokens', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: { type: DataTypes.INTEGER },
    refreshToken: { type: DataTypes.STRING }
})

const MainBlock = sequelize.define('mainBock', {
    title: { type: DataTypes.STRING },
    desc: { type: DataTypes.STRING },
    buttonVisible: { type: DataTypes.BOOLEAN, defaultValue: true },
    textButton: { type: DataTypes.STRING },
    linkButton: { type: DataTypes.STRING },
})

const Settings = sequelize.define('settings', {
    metaKey: { type: DataTypes.STRING, allowNull: false },
    metaValue: { type: DataTypes.STRING, allowNull: false },
})

const GalleryBlock = sequelize.define('galleryBlock', {})

Users.hasOne(Tokens)
Tokens.belongsTo(Users);

Gallery.hasOne(MainBlock);
MainBlock.belongsTo(Gallery);

Gallery.hasOne(Tours);
Tours.belongsTo(Gallery);

Sizes.hasOne(Gallery);
Gallery.belongsTo(Sizes);

Gallery.hasOne(GalleryBlock);
GalleryBlock.belongsTo(Gallery);

module.exports = {
    Tours, Gallery, Sizes, Users, Tokens, MainBlock, Settings, GalleryBlock
}