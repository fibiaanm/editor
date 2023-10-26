export class ApplicationInstance{
    private static instance: ApplicationInstance
    private _parent: HTMLDivElement
    private _wrapper: HTMLDivElement

    private _aspectRatio: number
    constructor(div: HTMLDivElement) {
        this._wrapper = div
        this._parent = div.parentElement as HTMLDivElement
        this.addResizeListener()
    }

    static getInstance(div?: HTMLDivElement){
        if(this.instance) return this.instance

        this.instance = new ApplicationInstance(div!)
        return this.instance
    }

    public resizeElement(){
        this._wrapper.style.width = `${600}px`
        this._wrapper.style.height = `${800}px`
    }

    private addResizeListener(){
        this.resizeElement()
        this._parent.addEventListener('resize', this.resizeElement)
    }

    get bounds(){
        return this._wrapper.getBoundingClientRect()
    }
}

export const app = () => {
    return ApplicationInstance.getInstance()
}