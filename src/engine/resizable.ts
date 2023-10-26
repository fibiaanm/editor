import {ShapeHelper} from "./shape.helper.ts";
import {ElementEntity} from "./element.entity.ts";
import {frame, position} from "../schema/frame.schema.ts";

interface resizableSelectors {
    topLeft: HTMLDivElement,
    topRight: HTMLDivElement,
    bottomLeft: HTMLDivElement,
    bottomRight: HTMLDivElement
}

type selectedButton = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'

export class Resizable extends ShapeHelper{
    private _selectors: resizableSelectors = {} as resizableSelectors
    private _click: position
    private _hold: boolean = false
    private _cache: DOMRect
    private _selectedButton: selectedButton
    constructor(el: ElementEntity) {
        super(el)
    }

    public placeSelectors(){
        this._selectors.topLeft = this.createSelector()
        this.topLeft.addEventListener('mousedown', (e) => {
            document.body.style.cursor = 'nwse-resize'
            this.topLeft.style.cursor = 'nwse-resize'
            this._selectedButton = 'topLeft'
        })
        this._selectors.topRight = this.createSelector()
        this.topRight.addEventListener('mousedown', (e) => {
            document.body.style.cursor = 'nesw-resize'
            this.topRight.style.cursor = 'nesw-resize'
            this._selectedButton = 'topRight'
        })
        this._selectors.bottomLeft = this.createSelector()
        this.bottomLeft.addEventListener('mousedown', (e) => {
            document.body.style.cursor = 'nesw-resize'
            this.bottomLeft.style.cursor = 'nesw -resize'
            this._selectedButton = 'bottomLeft'
        })
        this._selectors.bottomRight = this.createSelector()
        this.bottomRight.addEventListener('mousedown', (e) => {
            document.body.style.cursor = 'nwse-resize'
            this.bottomRight.style.cursor = 'nwse-resize'
            this._selectedButton = "bottomRight"
        })

        this.moveSelectors()
    }

    private createSelector(){
        const el = document.createElement('div')
        el.style.left = 'var(--x)'
        el.style.top = 'var(--y)'
        el.classList.add('resizable-selector')
        el.addEventListener('mousedown', (e) => {
            this.shape.Resizing = true
            this._hold = true
            this._click = {
                x: e.x,
                y: e.y,
            }
            this._cache = this.element.getBoundingClientRect()
            setTimeout(() => {
                this.element.focus()
                this.shape.Resizing = false
            }, 1)
        })
        el.addEventListener('mouseup', () => {
            this._hold = false
        })
        window.addEventListener('mousemove', (e) => {
            if(!this._hold) return

            const bounds = this.parent

            const deltaX = e.x - this._click.x
            const deltaY = e.y - this._click.y
            const w = this._cache.width
            const h = this._cache.height
            const x = this._cache.x - bounds.x
            const y = this._cache.y - bounds.y
            switch (this._selectedButton){
                case "bottomRight":
                    this.element.style.setProperty('--w', `${w + deltaX}px`)
                    this.element.style.setProperty('--h', `${h + deltaY}px`)
                    break
                case "bottomLeft":
                    this.element.style.setProperty('--w', `${w - deltaX}px`)
                    this.element.style.setProperty('--h', `${h + deltaY}px`)
                    this.element.style.setProperty('--x', `${deltaX + x}px`)
                    break
                case "topLeft":
                    this.element.style.setProperty('--w', `${w - deltaX}px`)
                    this.element.style.setProperty('--h', `${h - deltaY}px`)
                    this.element.style.setProperty('--x', `${deltaX + x}px`)
                    this.element.style.setProperty('--y', `${deltaY + y}px`)
                    break
                case "topRight":
                    this.element.style.setProperty('--w', `${w + deltaX}px`)
                    this.element.style.setProperty('--h', `${h - deltaY}px`)
                    this.element.style.setProperty('--x', `${x}px`)
                    this.element.style.setProperty('--y', `${deltaY + y}px`)
                    break
            }

            if(this.isSelected)
                this.shape.getSelectable?.moveSelectionBorder()
            this.moveSelectors()
        })
        window.addEventListener('mouseup', () => {
            document.body.style.cursor = 'default'
            el.style.cursor = 'pointer'
            this._hold = false
        })

        document.body.append(el)
        return el
    }

    public moveSelectors(){
        const bounds = this.element.getBoundingClientRect()

        this._selectors.topLeft.style.setProperty(
            '--x',
            `${bounds.x - 5}px`
        )
        this._selectors.topLeft.style.setProperty(
            '--y',
            `${bounds.y - 5}px`
        )

        this._selectors.topRight.style.setProperty(
            '--x',
            `${bounds.x + bounds.width - 5}px`
        )
        this._selectors.topRight.style.setProperty(
            '--y',
            `${bounds.y - 5}px`
        )

        this._selectors.bottomRight.style.setProperty(
            '--x',
            `${bounds.x + bounds.width - 5}px`
        )
        this._selectors.bottomRight.style.setProperty(
            '--y',
            `${bounds.y + bounds.height - 5}px`
        )

        this._selectors.bottomLeft.style.setProperty(
            '--x',
            `${bounds.x - 5}px`
        )
        this._selectors.bottomLeft.style.setProperty(
            '--y',
            `${bounds.y + bounds.height - 5}px`
        )
    }

    public removeSelectors(){
        for(const el of Object.keys(this._selectors)){
            this._selectors[el].remove()
        }
    }

    get topLeft(){
        return this._selectors.topLeft
    }
    get topRight(){
        return this._selectors.topRight
    }
    get bottomLeft(){
        return this._selectors.bottomLeft
    }
    get bottomRight(){
        return this._selectors.bottomRight
    }
}