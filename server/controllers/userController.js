const ApiError = require('../error/ApiError');
const { Users } = require('../models/models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const generateJwt = (id, email, role) => {
    return jwt.sign(
        { id, email, role },
        process.env.SECRET_KEY,
        { expiresIn: '24h' }
    )
}

class UsersController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Ошибка при регистрации', errors });
            }
            const { email, password } = req.body;

            const candidate = await Users.findOne({ where: { email } })
            if (candidate) {
                return next(ApiError.badRequest('Пользователь с такой почтой уже существует'))
            }
            const hashPassword = await bcrypt.hash(password, 7);
            const user = await Users.create({
                email: email,
                password: hashPassword,
                role: 'ADMIN',
            })
            const token = generateJwt(user.id, user.email, user.role);
            return res.json({ token });
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async login(req, res, next) {
        const { email, password } = req.body
        const user = await Users.findOne({ where: { email } })
        if (!user) {
            return next(ApiError.internal('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if (!comparePassword) {
            return next(ApiError.internal('Указан неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({ token })
    }


    async check(req, res, next) {
        try {
            const token = generateJwt(req.user.id, req.user.email, req.user.role)
            return res.json({ token })
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }
}

module.exports = new UsersController();