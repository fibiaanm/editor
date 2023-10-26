import {ElementEntity} from "./element.entity.ts";

export class ShapeHelper{
    private readonly _shape: ElementEntity
    constructor(shape: ElementEntity) {
        this._shape = shape
    }

    get shape(){
        return this._shape
    }

    get element(){
        return this._shape.element
    }

    get parent(){
        return this._shape.parent
    }

    get isSelected(){
        return this._shape.getSelectable?.selected
    }

    get isResizable(){
        return !!this._shape.getResizable
    }

    get selectionBorder(){
        return this._shape.getSelectable?.selectionBorder
    }
    get resizeActions(){
        return this._shape.getResizable!
    }
}