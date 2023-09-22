import { $apiAuth } from "../http";

export default class UserService {
    static fetchUsers() {
        return $apiAuth.get('/users');
    }

}