const ApiError = require('../error/ApiError');
const { Users } = require('../models/models');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');

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
            const { email, password, role } = req.body;
            if (!email || !password) {
                return next(ApiError.badRequest('Некорректный email или пароль'))
            }
            const candidate = await Users.findOne({ where: { email } })
            if (candidate) {
                return next(ApiError.badRequest('Пользователь с такой почтой уже существует'))
            }
            const hashPassword = await bcrypt.hash(password, 5);
            const user = await Users.create({
                email: email,
                role: role,
                password: hashPassword
            })
            const token = generateJwt(user.id, user.email, user.role);
            return res.json({ token });
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
    }

    async login(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = Users.findOne({ where: { email } })
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
        const { id } = req.query;
        if (!id) {
            return next(ApiError.badRequest('Не указан id'));
        }
        res.json(id);
    }
}

module.exports = new UsersController();