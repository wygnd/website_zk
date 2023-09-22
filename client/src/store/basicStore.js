import { makeAutoObservable } from "mobx";

export default class BasicStore {
    constructor() {
        this._phones = [
            { id: 1, value: '+7 999 999-99-99', name: 'Телефон 1' },
            { id: 2, value: '+7 999 999-99-99', name: 'Телефон 2' },
        ];

        makeAutoObservable(this);
    }

    static setPhones(phones) {
        this._phones = phones;
    }

    static addPhone(phone) {
        this._phones = this._phones.push(phone);
    }

    static removePhone(id) {
        this._phones = this._phones.filter(el => el.id !== id);
    }

    get phones() {
        return this._phones;
    }
}