import {BasicShape} from "./basicShape.ts";
import {position} from "../schema/frame.schema.ts";
import {ElementEntity} from "./element.entity.ts";
import {ShapeHelper} from "./shape.helper.ts";
import {app} from "./application.instance.ts";

export class Movable extends ShapeHelper{
    private _drag: boolean = false
    private _key: boolean = false
    private _diff: position
    constructor(shape: ElementEntity) {
        super(shape);
        this.addEvents()
    }

    private addEvents(){
        this.element.style.transform = 'translateX(var(--x)) translateY(var(--y))'
        this.element.addEventListener('mousedown', (e) => {
            this._drag = true
            document.body.style.cursor = 'move'
            this.element.style.cursor = 'move'
            const bounds = this.element.getBoundingClientRect()
            this._diff = {
                y: e.y - bounds.y,
                x: e.x - bounds.x
            }
        })
        this.element.addEventListener('mouseup', () => {
            this.element.style.cursor = 'default'
            this._drag = false
        })
        this.element.addEventListener('keydown', (key: KeyboardEvent) => {
            if(!this.isSelected) return

            let x: number = parseFloat(this.element.style.getPropertyValue('--x'))
            if(Number.isNaN(x)) x = 0
            let y = parseFloat(this.element.style.getPropertyValue('--y'))

            if(Number.isNaN(y)) y = 0

            x += app().bounds.x
            y += app().bounds.y

            this._diff = {x: 0, y: 0}
            this._key = true
            switch(key.key){
                case 'ArrowRight':
                    this.move({
                        x: x + 2,
                        y: y
                    } as MouseEvent)
                    break
                case 'ArrowLeft':
                    this.move({
                        x: x - 2,
                        y: y
                    } as MouseEvent)
                    break
                case 'ArrowUp':
                    this.move({
                        x: x,
                        y: y - 2
                    } as MouseEvent)
                    break
                case 'ArrowDown':
                    this.move({
                        x: x,
                        y: y + 2
                    } as MouseEvent)
                    break
            }
            this._key = false
        })

        window.addEventListener('mousemove', (e: MouseEvent) => {
            this.move(e)
        })
    }

    private move(ev: MouseEvent){
        if(!this._drag && !this._key) return

        const application = app()
        const x = ev.x - this._diff.x - application.bounds.x
        const y = ev.y - this._diff.y - application.bounds.y

        const bounds = this.element.getBoundingClientRect()
        if(
            x + application.bounds.x + bounds.width >= window.innerWidth ||
            x + application.bounds.x <= 0
        ) return
        if(
            y + application.bounds.y + bounds.width >= window.innerHeight ||
            y + application.bounds.y <= 0
        ) return

        this.element.style.setProperty('--x', `${x}px`)
        this.element.style.setProperty('--y', `${y}px`)

        if(this.isSelected){
            this.shape.getSelectable?.moveSelectionBorder()
        }
        if(this.isResizable){
            this.resizeActions.moveSelectors()
        }
    }


}