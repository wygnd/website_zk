const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const Tours = sequelize.define('tours', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, unique: true, allowNull: false },
    description: { type: DataTypes.STRING },
    image: { type: DataTypes.INTEGER, allowNull: false },
})

const Gallery = sequelize.define('gallery', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    path: { type: DataTypes.STRING },
    size: { type: DataTypes.STRING },
})

const Users = sequelize.define('users', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, defaultValue: 'USER' }
})

Tours.hasOne(Gallery);
Gallery.belongsTo(Tours);

module.exports = {
    Tours, Gallery, Users
}