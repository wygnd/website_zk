import { makeAutoObservable } from "mobx";

export default class TourStore {
    constructor() {
        this._tours = [];
        this._update = false;
        makeAutoObservable(this);
    }

    setTours(tours) {
        this._tours = tours;
    }

    setUpdate(bool) {
        this._update = bool;
    }

    get tours() {
        return this._tours;
    }

    get update() {
        return this._update;
    }
}