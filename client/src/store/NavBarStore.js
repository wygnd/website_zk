import { makeAutoObservable } from "mobx";

export default class NavBarStore {

    elements = [
        { id: 1, title: 'Экскурсии', link: '#tours' },
        { id: 2, title: 'Колекция', link: '#collections' },
        { id: 3, title: 'О проекте', link: '#about' },
        { id: 4, title: 'Галлерея', link: '#gallery' },
        { id: 5, title: 'Контакты', link: '#contacts' },
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