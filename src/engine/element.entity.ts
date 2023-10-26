import {BasicShape} from "./basicShape.ts";
import {Selectable} from "./selectable.ts";
import {Movable} from "./movable.ts";
import {Resizable} from "./resizable.ts";

export class ElementEntity extends BasicShape{
    constructor (el: HTMLElement){
        super(el)
        el.style.width = 'var(--w)'
        el.style.height = 'var(--h)'
        el.style.setProperty('--w', '100px')
        el.style.setProperty('--h', '100px')
        el.style.setProperty('--x', '0px')
        el.style.setProperty('--y', '0px')
    }

    public movable(){
        this._movable = new Movable(this)
        return this
    }

    public selectable(){
        this._selectable = new Selectable(this)
        return this
    }

    public resizable(){
        this._resizable = new Resizable(this)
        return this
    }
}