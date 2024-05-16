import {makeAutoObservable} from "mobx";

export default class TextStore {
	constructor() {
		this._block = {
			title: "",
			desc: "",
			image_id: false
		};
		
		makeAutoObservable(this);
	}
	
	setBlock(block) {
		this._block = block;
	}
	
	changeItem(key, value) {
		this._block[key] = value;
	}
	
	get block() {
		return this._block;
	}
}