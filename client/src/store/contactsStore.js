import { makeAutoObservable } from "mobx";

export default class ContactsStore {
    constructor() {
        this._map = {};
        makeAutoObservable(this);
    }

    setMap(map) {
        this._map = map;
    }

    get map() {
        return this._map;
    }
}