const ApiError = require("../error/ApiError");
const { Users } = require("../models/models");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const userService = require("../service/userService");

class UsersController {
  async registration(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Ошибка валидации", errors.array()));
      }
      const { email, password } = req.body;
      const userData = await userService.registration(email, password);
      res.cookie("tokenRef", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie("tokenRef", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const { tokenRef } = req.cookies;
      const token = await userService.logout(tokenRef);
      res.clearCookie("tokenRef");
      if (token) {
        return res.json({ message: "Выход выполнен" });
      }
      return res.json(token);
    } catch (error) {
      next(error);
    }
  }

  async check(req, res, next) {
    try {
      const token = generateJwt(req.user.id, req.user.email, req.user.role);
      return res.json({ token });
    } catch (error) {
      next(ApiError.badRequest(error.message));
    }
  }

  async refresh(req, res, next) {
    try {
      const { tokenRef } = req.cookies;
      const userData = await userService.refresh(tokenRef);
      res.cookie("tokenRef", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.json(userData);
    } catch (error) {
      next(ApiError.BadRequest(error.message));
    }
  }

  async getAll(req, res, next) {
    try {
      const userData = await userService.getAll();
      return res.json(userData);
    } catch (error) {
      next(ApiError.BadRequest(error.message));
    }
  }
}

module.exports = new UsersController();
