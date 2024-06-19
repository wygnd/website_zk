require('dotenv').config();
const compression = require('compression')
const express = require('express');
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const fileUpload = require('express-fileupload')
const router = require('./routes/index');
const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const path = require('path');
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 5000;

const app = express();
app.use(compression())
app.use(cors({
	credentials: true,
	origin: "http://localhost:3000",
	optionSuccessStatus: 200
}));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static(path.resolve(__dirname, 'uploads')));
app.use(fileUpload({}));
app.use('/api', router);

// Обработка ошибок, последний MiddleWare
app.use(errorHandler);

const start = async () => {
	try {
		await sequelize.authenticate();
		await sequelize.sync({
			alter: {
				drop: false,
			}
		});
		app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
	} catch(error) {
		console.log(error);
	}
}

start();
