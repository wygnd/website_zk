import { makeAutoObservable } from "mobx";

export default class NavBarStore {
    constructor() {
        this._elements = [
            {id: 1, title: 'Экскурсии', link: '#tours'},
            {id: 2, title: 'Колекция', link: '#collections'},
            {id: 3, title: 'О проекте', link: '#about'},
            {id: 4, title: 'Галлерея', link: '#gallery'},
            {id: 5, title: 'Контакты', link: '#contacts'},
        ];
        makeAutoObservable(this);
    }

    setElements(elements) {
        this._elements = this._elements.push(elements);
    }

    get elements() {
        return this._elements;
    }
}