import {makeAutoObservable} from "mobx";

export default class GalleryStore {
	constructor() {
		this._gallery = [];
		this._update = false;
		this._page = 1;
		this._totalCount = 0;
		this._limit = 24;
		this._loaded = 24;
		this._modal = false;
		this._sucModal = false;
		this._errModal = false;
		this._messageModal = "";
		this._imageId = 0;
		
		makeAutoObservable(this);
	}
	
	setImages(gallery) {
		this._gallery = gallery;
	}
	
	setUpdate(bool) {
		this._update = bool;
	}
	
	setPage(page) {
		this._page = page;
	}
	
	setLimit(limit) {
		this._limit = limit;
	}
	
	setTotalCount(totalCount) {
		this._totalCount = totalCount;
	}
	
	setLoaded(loaded) {
		this._loaded = loaded;
	}
	
	setModal(bool) {
		this._modal = bool;
	}
	
	setModalSucc(bool) {
		this._sucModal = bool;
	}
	
	setModalErr(bool) {
		this._errModal = bool;
	}
	
	setModalMsg(msg) {
		this._messageModal = msg;
	}
	
	callModalError(message) {
		this._messageModal = message;
		this._errModal = true;
		setTimeout(() => {
			this._errModal = false;
		}, 3000)
	}
	
	callModalSuccess(message) {
		this._messageModal = message;
		this._sucModal = true;
		setTimeout(() => {
			this._sucModal = false;
		}, 3000)
	}
	
	addImage(image) {
		this._gallery.unshift(image);
	}
	
	removeImageById(image_id) {
		this._gallery.filter(i => i.id !== image_id);
	}
	
	get gallery() {
		return this._gallery;
	}
	
	get update() {
		return this._update;
	}
	
	get page() {
		return this._page;
	}
	
	get totalCount() {
		return this._totalCount;
	}
	
	get limit() {
		return this._limit;
	}
	
	get loaded() {
		return this._loaded;
	}
	
	get modal() {
		return this._modal;
	}
	
	get modalSucc() {
		return this._sucModal;
	}
	
	get modalErr() {
		return this._errModal;
	}
	
	get messageModal() {
		return this._messageModal;
	}
	
	get imageId() {
		return this._imageId;
	}
}
