import {makeAutoObservable} from "mobx";

export default class NavBarStore {
	
	constructor() {
		this.items = [
			{id: 1, title: 'О проекте', link: '#about__block', order: 1},
			{id: 2, title: 'Экскурсии', link: '#tours__block', order: 2},
			{id: 3, title: 'Бар-музей', link: '#collections__block', order: 3},
			{id: 4, title: 'Деловые ужины', link: '#text_block', order: 4},
			{id: 5, title: 'Галлерея', link: '#gallery__block', order: 5},
			{id: 6, title: 'Команда', link: '#teams__block', order: 6},
			{id: 7, title: 'Контакты', link: '#contacts__block', order: 7},
		];
		makeAutoObservable(this);
	}
	
	setElements(elements) {
		this.items = this.items = elements;
	}
	
	removeElement(id) {
		this.items = this.items.filter(el => el.id !== id);
	}
	
	addElement(element) {
		this.items.push(element);
	}
	
	get elements() {
		return this.items;
	}
}