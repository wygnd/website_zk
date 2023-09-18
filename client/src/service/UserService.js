import $api from "../http";

export default class AuthService {
    static fetchUsers() {
        return $api.get('/users');
    }

}