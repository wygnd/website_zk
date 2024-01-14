import { makeAutoObservable } from "mobx";

export default class TourStore {
    constructor() {
        this._tours = [];
        this._update = false;
        this._lastItem = {};
        this._lastItemVisible = false;
        this._updateLastItem = false;
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

    setLastItemVisible(bool) {
        this._lastItemVisible = bool;
    }

    setUpdateLastItem(bool) {
        this._updateLastItem = bool;
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

    get lastItemVisible() {
        return this._lastItemVisible;
    }

    get updateLastItem() {
        return this._updateLastItem;
    }
}