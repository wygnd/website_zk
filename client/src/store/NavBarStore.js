import { makeAutoObservable } from "mobx";

export default class NavBarStore {

    elements = [
        { id: 1, title: 'Экскурсии', link: 'tours__block' },
        { id: 2, title: 'Колекция', link: 'collections__block' },
        { id: 3, title: 'О проекте', link: 'about__block' },
        { id: 4, title: 'Галлерея', link: 'gallery__block' },
        { id: 5, title: 'Контакты', link: 'contacts__block' },
    ];

    constructor() {
        makeAutoObservable(this);
    }

    setElements(elements) {
        this.elements = this.elements.push(elements);
    }

    removeElement(id) {
        this.elements = this.elements.filter(el => el.id !== id);
    }

    // get elements() {
    //     return this.elements;
    // }
}