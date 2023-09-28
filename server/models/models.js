const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Tours = sequelize.define('tours', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    description: { type: DataTypes.STRING },
    image: { type: DataTypes.STRING },
})

const Gallery = sequelize.define('gallery', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    fileName: { type: DataTypes.STRING },
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


Users.hasOne(Tokens)
Tokens.belongsTo(Users);

Gallery.hasOne(MainBlock);
MainBlock.belongsTo(Gallery);

module.exports = {
    Tours, Gallery, Users, Tokens, MainBlock, Settings
}