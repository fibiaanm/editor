import {Selectable} from "./selectable.ts";
import {Movable} from "./movable.ts";
import {Resizable} from "./resizable.ts";
import {app} from "./application.instance.ts";

export class BasicShape{
    private  readonly  _el: HTMLElement
    protected _selectable?: Selectable
    protected _movable?: Movable
    protected _resizable?: Resizable

    private _onResize: boolean = false

    protected constructor(el) {
        this._el = el
    }
    get element(){
        return this._el
    }
    get parent(){
        return app().bounds
    }

    get getSelectable(){
        return this._selectable
    }
    get getResizable(){
        return this._resizable
    }

    get onResize(){
        return this._onResize
    }
    set Resizing(status: boolean){
        this._onResize = status
    }
}