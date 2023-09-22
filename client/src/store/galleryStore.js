import { makeAutoObservable } from "mobx";
import GalleryService from "../service/galleryService";
import { SERVER_URL } from "../utils/consts";

export default class GalleryStore {
    constructor() {
        this._gallery = [];
        this._logo = {src: `${SERVER_URL}/05e3fe88-d930-48c0-899e-03a9b2291152.jpg`};
        // this._logo = {src: 'https://www.omsk.atmos-fera.ru/upload/iblock/a66/a669d19473f501b09fa5b087d8b5d7b2.png', fileName: "nameFile"};

        makeAutoObservable(this);
    }

    setImages(gallery) {
        this._gallery = gallery;
    }

    // async getImages() {
    //     const gallery = await GalleryService.fetchImages();
    //     this.setImages(gallery);
    // }

    setLogo(image) {
        this._logo = image;
    }

    get gallery() {
        return this._gallery;
    }

    get getLogo() {
        return this._logo;
    }
}