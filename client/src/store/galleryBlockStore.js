import { makeAutoObservable } from "mobx";

export default class CollectionsStore {
    constructor() {
        this._images = [];
        this._update = false;
        makeAutoObservable(this);
    }

    setGallery(images) {
        this._images = images;
    }

    setUpdate(bool) {
        this._update = bool;
    }

    get images() {
        return this._images;
    }

    get update() {
        return this._update;
    }
}