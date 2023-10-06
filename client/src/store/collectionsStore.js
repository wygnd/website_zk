import { makeAutoObservable } from "mobx";

export default class CollectionsStore {
    constructor() {
        this._name = '';
        this._desc = '';
        this._gallery = [];
        this._countImages = 0;
        this._blockUpdate = false;
        makeAutoObservable(this);
    }

    setName(name) {
        this._name = name;
    }

    setDesc(desc) {
        this._desc = desc;
    }

    setGallery(gallery) {
        this._gallery = gallery;
    }

    setCountImages(count) {
        this._countImages = count;
    }

    setUpdate(bool) {
        this._blockUpdate = bool;
    }

    get name() {
        return this._name;
    }

    get desc() {
        return this._desc;
    }

    get gallery() {
        return this._gallery;
    }

    get countImages() {
        return this._countImages;
    }

    get update() {
        return this._blockUpdate;
    }
}