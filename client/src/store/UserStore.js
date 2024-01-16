import { makeAutoObservable } from "mobx";
import AuthService from "../service/AuthService";
import axios from "axios";
import { API_URL } from "../utils/consts";
import { $apiAuth } from "../http";

export default class UserStore {
  constructor() {
    this._isAuth = false;
    this._user = {};
    this._isLoading = false;
    this._errors = {};

    makeAutoObservable(this);
  }

  setIsAuth(bool) {
    this._isAuth = bool;
  }

  setUser(user) {
    this._user = user;
  }

  setLoading(bool) {
    this._isLoading = bool;
  }

  async login(email, password) {
    try {
      const response = await AuthService.login(email, password);
      localStorage.setItem("token", response.data.accessToken);
      this.setIsAuth(true);
      this.setUser(response.data.user);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  }

  async registration(email, password) {
    try {
      const response = await AuthService.registration(email, password);
      localStorage.setItem("token", response.data.accessToken);
      this.setIsAuth(true);
      this.setUser(response.data.user);
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  }

  async logout() {
    try {
      const response = await AuthService.logout();
      localStorage.removeItem("token");
      console.log(response);
      this.setIsAuth(false);
      this.setUser({});
      return response.data.message;
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  }

  async checkAuth() {
    this.setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/users/refresh`, {
        withCredentials: true,
      });
      localStorage.setItem("token", response.data.accessToken);
      this.setIsAuth(true);
      this.setUser(response.data.user);
    } catch (error) {
      console.log(error.response?.data?.message);
    } finally {
      this.setLoading(false);
    }
  }

  async validatePass(email, password) {
    try {
      const data = await $apiAuth.post(`/users/user/validate_pass`, {
        email,
        password,
      });
      return data;
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  }

  async changeUserPass(email, old_pass, new_pass) {
    try {
      const response = await $apiAuth.post("/users/user/change_pass", {
        email,
        old_pass,
        new_pass,
      });
      return response;
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  }

  async changeUserInfo(email, name, last_name) {
    try {
      const response = await $apiAuth.post(`/users/user/change_data`, {
        email,
        name,
        last_name,
      });
      return response;
    } catch (error) {
      console.log(error.response?.data?.message);
    }
  }

  get isAuth() {
    return this._isAuth;
  }

  get user() {
    return this._user;
  }

  get isLoading() {
    return this._isLoading;
  }
}
