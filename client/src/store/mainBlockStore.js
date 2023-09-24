import { makeAutoObservable } from "mobx";

export default class MainBlockStore {
    constructor() {
        this._slides = [];

        makeAutoObservable(this);
    }

    setSlides(slides) {
        this._slides = slides;
    }

    get slides() {
        return this._slides
    }
}

