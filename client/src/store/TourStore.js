import {makeAutoObservable} from "mobx";

export default class TourStore {
	constructor() {
		this._tours = [];
		this._update = false;
		this._lastItem = {};
		this._lastItemVisible = false;
		this._updateLastItem = false;
		makeAutoObservable(this);
	}
	
	setTours(tours) {
		this._tours = tours;
	}
	
	setUpdate(bool) {
		this._update = bool;
	}
	
	setLastItem(data) {
		this._lastItem = data;
	}
	
	setLastItemVisible(bool) {
		this._lastItemVisible = bool;
	}
	
	setUpdateLastItem(bool) {
		this._updateLastItem = bool;
	}
	
	changeTour(data) {
		let tour_item = this._tours.find(t => t.tour_id === data.tour_id);
		tour_item.tour_name = data.tour_name;
		tour_item.textButton = data.textButton;
		tour_item.linkButton = data.linkButton;
		tour_item.galleryId = data.galleryId;
		tour_item.order = data.order;
	}
	
	get tours() {
		return this._tours;
	}
	
	get update() {
		return this._update;
	}
	
	get lastItem() {
		return this._lastItem;
	}
	
	get lastItemVisible() {
		return this._lastItemVisible;
	}
	
	get updateLastItem() {
		return this._updateLastItem;
	}
}