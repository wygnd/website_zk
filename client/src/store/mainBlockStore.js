import { makeAutoObservable } from "mobx";

export default class MainBlockStore {
    constructor() {
        this._slides = [];
        this._update = false;

        makeAutoObservable(this);
    }

    setSlides(slides) {
        this._slides = slides;
    }

    setUpdate(bool) {
        this._update = bool;
    }

    get slides() {
        return this._slides
    }

    get update() {
        return this._update;
    }
}

