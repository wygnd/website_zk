import { makeAutoObservable } from "mobx";
import GalleryService from "../service/galleryService";
import { SERVER_URL } from "../utils/consts";

export default class GalleryStore {
    constructor() {
        this._gallery = [];
        this._update = false;

        makeAutoObservable(this);
    }

    setImages(gallery) {
        this._gallery = gallery;
    }

    setUpdate(bool) {
        this._update = bool;
    }

    get gallery() {
        return this._gallery;
    }

    get update() {
        return this._update;
    }
}