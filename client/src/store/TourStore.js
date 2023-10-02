import { makeAutoObservable } from "mobx";

export default class TourStore {
    constructor() {
        this._tours = [];
        this._update = false;
        this._lastItem = {};
        makeAutoObservable(this);
    }

    setTours(tours) {
        this._tours = tours;
    }

    setUpdate(bool) {
        this._update = bool;
    }

    setLastItem(data) {
        this._lastItem = data;
    }

    get tours() {
        return this._tours;
    }

    get update() {
        return this._update;
    }

    get lastItem() {
        return this._lastItem;
    }
}