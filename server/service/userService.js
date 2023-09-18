const { Users, Tokens } = require("../models/models");
const ApiError = require("../error/ApiError");
const bcrypt = require('bcrypt');
const UserDto = require("../dtos/userDto");
const tokenService = require("./tokenService");

class UserService {
    async registration(email, password) {
        const candidate = await Users.findOne({ where: { email } })
        if (candidate) {
            throw ApiError.BadRequest('Пользователь с такой почтой уже существует');
        }
        const hashPassword = await bcrypt.hash(password, 3);
        const user = await Users.create({ email: email, password: hashPassword, role: 'ADMIN', })
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);

        return { ...tokens, user: userDto };
    }

    async login(email, password) {
        const user = await Users.findOne({ where: { email } });
        if (!user) {
            throw ApiError.BadRequest('Пользователя с такой почтой не существует');
        }

        const isPassEquals = await bcrypt.compare(password, user.password);
        if (!isPassEquals) {
            throw ApiError.BadRequest('Неверный пароль');
        }

        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto });
        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto };
    }

    async logout(tokenRef) {
       const token = await tokenService.removeToken(tokenRef);
       return token;
    }
    async refresh(tokenRef) {
        if (!tokenRef) {
            throw ApiError.UnauthorizedError();
        }
        const userData = tokenService.validateRefreshToken(tokenRef);
        const tokenFromDB = await tokenService.findToken(tokenRef);
        if (!userData || !tokenFromDB) {
            throw ApiError.UnauthorizedError();
        }
        const user = await Users.findByPk(userData.id)
        const userDto = new UserDto(user);
        const tokens = tokenService.generateTokens({ ...userDto })

        await tokenService.saveToken(userDto.id, tokens.refreshToken);
        return { ...tokens, user: userDto };
    }
}

module.exports = new UserService();