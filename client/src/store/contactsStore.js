import { makeAutoObservable } from "mobx";

export default class ContactsStore {
    constructor() {
        this._map = {};
        this._update = false;
        makeAutoObservable(this);
    }

    setMap(map) {
        this._map = map;
    }

    setUpdate(bool) {
        this._map = bool;
    }

    get map() {
        return this._map;
    }

    get update() {
        return this._map;
    }
}