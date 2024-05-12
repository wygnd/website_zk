const sequelize = require("../db");
const {DataTypes} = require("sequelize");

const Tours = sequelize.define(
	"tours",
	{
		tour_id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
		tour_name: {type: DataTypes.TEXT('tiny'), allowNull: false},
		textButton: {type: DataTypes.STRING, defaultValue: null},
		linkButton: {type: DataTypes.STRING, defaultValue: null},
		order: {type: DataTypes.INTEGER, defaultValue: 0}
	},
	{
		timestamps: false,
		createdAt: false,
		updatedAt: false,
	}
);

const Gallery = sequelize.define(
	"gallery",
	{
		id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
		file_name: {type: DataTypes.TEXT('tiny'), allowNull: false},
		file_ext: {type: DataTypes.STRING, allowNull: false},
		author_id: {
			type: DataTypes.INTEGER,
			references: {
				model: "users",
				key: "id",
			},
		},
	},
	{
		timestamps: false,
		createdAt: false,
		updatedAt: false,
	}
);

const Users = sequelize.define(
	"users",
	{
		id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
		email: {type: DataTypes.STRING, allowNull: false},
		password: {type: DataTypes.STRING, allowNull: false},
		role: {type: DataTypes.STRING, defaultValue: "ADMIN"},
		name: {type: DataTypes.STRING, allowNull: false},
		last_name: {type: DataTypes.STRING, allowNull: false},
		access: {
			type: DataTypes.ENUM("full", "partial"),
			defaultValue: "full",
			allowNull: false,
		},
	},
	{
		timestamps: false,
		createdAt: false,
		updatedAt: false,
	}
);

const Tokens = sequelize.define(
	"tokens",
	{
		id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
		userId: {type: DataTypes.INTEGER},
		refreshToken: {type: DataTypes.TEXT("medium")},
	},
	{
		timestamps: false,
		createdAt: false,
		updatedAt: false,
	}
);

const MainBlock = sequelize.define(
	"mainBock",
	{
		title: {type: DataTypes.STRING},
		desc: {type: DataTypes.STRING},
		buttonVisible: {type: DataTypes.BOOLEAN, defaultValue: true},
		textButton: {type: DataTypes.STRING},
		linkButton: {type: DataTypes.STRING},
		order: {type: DataTypes.INTEGER, defaultValue: 0},
	},
	{
		timestamps: false,
		createdAt: false,
		updatedAt: false,
	}
);

const Settings = sequelize.define(
	"settings",
	{
		metaKey: {type: DataTypes.STRING, allowNull: false},
		metaValue: {type: DataTypes.TEXT("medium"), allowNull: false},
	},
	{
		timestamps: false,
		createdAt: false,
		updatedAt: false,
	}
);

const Teams = sequelize.define(
	"teams",
	{
		image_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			references: {
				model: "galleries",
				key: "id",
			},
		},
		title: {type: DataTypes.STRING, allowNull: false},
		description: {type: DataTypes.STRING, allowNull: true},
		order: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 0}
	},
	{
		timestamps: false,
		createdAt: false,
		updatedAt: false,
	}
)

const GalleryBlock = sequelize.define("galleryBlock", {});

Users.hasOne(Tokens);
Tokens.belongsTo(Users);

Gallery.hasOne(MainBlock);
MainBlock.belongsTo(Gallery);

Gallery.hasOne(Tours);
Tours.belongsTo(Gallery);

Gallery.hasOne(Users, {foreignKey: "id"})

Teams.hasOne(Gallery, {foreignKey: "id"})

Gallery.hasOne(GalleryBlock);
GalleryBlock.belongsTo(Gallery);

module.exports = {
	Tours,
	Gallery,
	Users,
	Tokens,
	MainBlock,
	Settings,
	GalleryBlock,
	Teams
};
