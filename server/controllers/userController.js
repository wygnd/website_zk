const ApiError = require('../error/ApiError');
const { Users } = require('../models/models');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const { validationResult, body } = require('express-validator');

const generateJwt = (id, email, role) => {
    return jsonwebtoken.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    );
}

class UsersController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Ошибка при регистрации', errors });
            }
            const { email, password, role } = req.body;

            const candidate = await Users.findOne({ where: { email } })
            if (candidate) {
                return next(ApiError.badRequest('Пользователь с такой почтой уже существует'))
            }
            const hashPassword = bcrypt.hashSync(password, 7);
            const user = await Users.create({
                email: email,
                password: hashPassword,
                role: role,
            })
            await user.save();
            const token = generateJwt(user.id, user.email, user.role);
            return res.json({ token });
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async login(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Ошибка при регистрации', errors });
            }
            const { email, password } = req.body;
            const user = await Users.findOne({ where: { email } })
            if (!user) {
                next(ApiError.badRequest('Пользователь с таким email не найден'))
            }
            let comparePassword = bcrypt.compareSync(password, user.password)
            if (!comparePassword) {
                next(ApiError.badRequest('Неверный пароль'));
            }
            const token = generateJwt(user.id, user.email, user.role);
            return res.json({ token })
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async check(req, res, next) {
        try {
            const token = generateJwt(req.user.id, req.user.email, req.user.role);
            return res.json({ token });
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
}

module.exports = new UsersController();