import { makeAutoObservable } from "mobx";

export default class MainBlockStore {
    constructor() {
        this._slides = [];
        this._update = false;
        this._slide = [];
        this._updateSlide = false;

        makeAutoObservable(this);
    }

    setSlides(slides) {
        this._slides = slides;
    }

    setOneSlide(slide) {
        this._slide = slide;
    }

    setUpdate(bool) {
        this._update = bool;
    }

    setUpdateSlide(bool) {
        this._updateSlide = bool;
    }
    
    get slides() {
        return this._slides
    }

    get update() {
        return this._update;
    }

    get slide() {
        return this._slide;
    }

    get updateSlide() {
        return this._updateSlide;
    }
}

