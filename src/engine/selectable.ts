import {BasicShape} from "./basicShape.ts";
import {ShapeHelper} from "./shape.helper.ts";
import {ElementEntity} from "./element.entity.ts";

export class Selectable extends ShapeHelper{
    private _select: boolean = false
    private _border: HTMLDivElement
    private _mousedown: boolean = false

    constructor(shape: ElementEntity) {
        super(shape)
        this.element.addEventListener('mousedown', () => {
            this.select()
        })
        this.element.addEventListener('blur', () => {
            this.release()
        })

        this.element.oncontextmenu = (ev) => {
            ev.preventDefault()
        }
    }

    public select(){
        if(this._select) return
        this._select = true
        this.element.focus()
        this._border = document.createElement('div')
        document.body.append(this._border)
        this._border.classList.add('select-borders')
        this._border.style.pointerEvents = 'none'
        this._border.style.left = 'var(--x)'
        this._border.style.top =  'var(--y)'
        this._border.style.width = 'var(--w)'
        this._border.style.height = 'var(--h)'
        this.moveSelectionBorder()

        if(this.isResizable)
            this.resizeActions.placeSelectors()

    }

    public moveSelectionBorder(){
        const bounds = this.element.getBoundingClientRect()
        this._border.style.setProperty('--x',`${bounds.x - 1}px`)
        this._border.style.setProperty('--y',`${bounds.y - 1}px`)
        this._border.style.setProperty('--w',`${bounds.width + 1}px`)
        this._border.style.setProperty('--h',`${bounds.height + 1}px`)
    }

    public release(){
        if(this.shape.onResize) return
        this._select = false
        this._border.remove()
        if(this.isResizable)
            this.resizeActions.removeSelectors()
    }

    get selected(){
        return this._select
    }
    get selectionBorder(){
        return this._border
    }
}