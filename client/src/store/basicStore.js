import { makeAutoObservable } from "mobx";

export default class BasicStore {
    constructor() {
        this._logo = {};
        this._phones = [];
        this._socials = [];
        this._emails = [];
        this._update = false;

        makeAutoObservable(this);
    }

    setPhones(phones) {
        this._phones = phones;
    }

    setUpdate(bool) {
        this._update = bool;
    }

    addPhone(phone) {
        this._phones = this._phones.push(phone);
    }

    setLogo(logo) {
        this._logo = logo;
    }

    setSocials(socials) {
        this._socials = socials;
    }

    getPhone(id) {
        return this.phones.filter(p => p.id !== id);
    }
    setEmails(emails) {
        this._emails = emails;
    }

    get phones() {
        return this._phones;
    }

    get update() {
        return this._update;
    }

    get logo() {
        return this._logo;
    }

    get socials() {
        return this._socials;
    }

    get emails() {
        return this._emails;
    }
}