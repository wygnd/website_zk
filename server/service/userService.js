const { Users } = require("../models/models");
const ApiError = require("../error/ApiError");
const bcrypt = require("bcrypt");
const UserDto = require("../dtos/userDto");
const tokenService = require("./tokenService");

class UserService {
  async registration(email, password, name, last_name) {
    const candidate = await Users.findOne({ where: { email } });
    if (candidate) {
      throw ApiError.BadRequest("Пользователь с такой почтой уже существует");
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const user = await Users.create({
      email: email,
      password: hashPassword,
      role: "ADMIN",
      name,
      last_name,
    });
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);

    return { ...tokens, user: userDto };
  }

  async login(email, password) {
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      throw ApiError.BadRequest("Пользователя с такой почтой не существует");
    }

    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest("Неверный пароль");
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
    const user = await Users.findByPk(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async getAll() {
    const usersData = await Users.findAll();
    if (!usersData) {
      throw ApiError.BadRequest("Пользователей не найдено");
    }
    return usersData;
  }

  async getUserById(user_id) {
    const userData = await Users.findByPk(user_id);
    if(!userData) {
      throw ApiError.BadRequest(`Пользователя с id=${user_id} не найдено`);
    }
    const user = new UserDto(userData);
    return user;
  }

  async validatePassword(email, password) {
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      throw ApiError.BadRequest("Пользователя с такой почтой не существует");
    }
    const isPassEquals = await bcrypt.compare(password, user.password);
    return isPassEquals;
  }

  async changeInfo(email, name, last_name) {
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      throw ApiError.BadRequest("Пользователя с такой почтой не существует");
    }
    await user.update({ email, name, last_name });
    await user.save();
    const userDto = new UserDto(user);
    return userDto;
  }

  async changePass(email, old_pass, new_pass) {
    const user = await Users.findOne({ where: { email } });
    if (!user) {
      throw ApiError.BadRequest("Пользователя с такой почтой не существует");
    }
    const isPassEquals = await bcrypt.compare(old_pass, user.password);
    if (!isPassEquals) {
      throw ApiError.ErrorRequest("Неверный пароль");
    }
    const newHashedPassword = await bcrypt.hash(new_pass, 3);
    await user.update({ email, password: newHashedPassword });
    await user.save();
    const userDto = new UserDto(user);
    return userDto;
  }
}

module.exports = new UserService();
