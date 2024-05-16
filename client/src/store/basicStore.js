import {makeAutoObservable} from "mobx";

export default class BasicStore {
	constructor() {
		this._logo = {};
		this._phones = [];
		this._socials = [];
		this._emails = [];
		this._siteTitle = null;
		this._siteDesc = null;
		this._update = false;
		this._loading = false;
		this._loadingPage = true;
		this._footerDesc = null;
		this._footerCopyright = null;
		this._map = [59.230757, 39.898394];
		
		makeAutoObservable(this);
	}
	
	setMap(map) {
		this._map = map;
	}
	
	get map() {
		return this._map;
	}
	
	setPhones(phones) {
		this._phones = phones;
	}
	
	setUpdate(bool) {
		this._update = bool;
	}
	
	addPhone(phone) {
		this._phones = this._phones.push(phone);
	}
	
	setLogo(logo) {
		this._logo = logo;
	}
	
	setSocials(socials) {
		this._socials = socials;
	}
	
	getPhone(id) {
		return this.phones.filter(p => p.id !== id);
	}
	
	setEmails(emails) {
		this._emails = emails;
	}
	
	setSiteTitle(data) {
		this._siteTitle = data;
	}
	
	setSiteDesc(data) {
		this._siteDesc = data;
	}
	
	setLoading(boolean) {
		this._loading = boolean;
	}
	
	setLoadingPage(boolean) {
		this._loadingPage = boolean;
	}
	
	setFooterDesc(data) {
		this._footerDesc = data;
	}
	
	setCopyright(data) {
		this._footerCopyright = data;
	}
	
	get phones() {
		return this._phones;
	}
	
	get update() {
		return this._update;
	}
	
	get logo() {
		return this._logo;
	}
	
	get socials() {
		return this._socials;
	}
	
	get emails() {
		return this._emails;
	}
	
	get siteTitle() {
		return this._siteTitle;
	}
	
	get siteDesc() {
		return this._siteDesc;
	}
	
	get loading() {
		return this._loading;
	}
	
	get loadingPage() {
		return this._loadingPage;
	}
	
	get footerDesc() {
		return this._footerDesc;
	}
	
	get copyright() {
		return this._footerCopyright;
	}
}