import { makeAutoObservable } from "mobx";

export default class aboutStore {
    constructor() {
        this._image = {};
        this._desc = '';
        this._update = false;

        makeAutoObservable(this);
    }

    setImage(image) {
        this._image = image;
    }

    setDesc(desc) {
        this._desc = desc;
    }

    setUpdate(update) {
        this._update = update;
    }

    get image() {
        return this._image;
    }

    get desc() {
        return this._desc;
    }

    get update() {
        return this._update;
    }

}