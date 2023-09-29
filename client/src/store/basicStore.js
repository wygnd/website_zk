import { makeAutoObservable } from "mobx";

export default class BasicStore {
    constructor() {
        this._logo = [];
        this._phones = [];
        this._socials = [
            { id: 1, metaKey: 'soc-1', metaValue: 'https://www.google.com/', icon: '15' },
            { id: 2, metaKey: 'soc-2', metaValue: 'https://www.google.com/', icon: '16' }
        ];
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

    get phones() {
        return this._phones;
    }

    getPhone(id) {
        return this.phones.filter(p => p.id !== id);
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
}