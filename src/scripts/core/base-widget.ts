import { Observable, ObservableOptions } from './observable'

export interface BaseWidgetOptions extends ObservableOptions {
  visible?: boolean
  baseCls?: string
  renderTo?: HTMLElement
  animationDelay?: number
  content?: string | number
}

export class BaseWidget extends Observable {
  private visible = true
  private baseCls = ''
  private renderTo: HTMLElement
  protected animationDelay = 250
  private boxElem: HTMLElement
  private contentElem: HTMLElement
  private content: string | number

  constructor(options: BaseWidgetOptions) {
    super({ events: options.events })

    Object.assign(this, options)

    if (this.renderTo) {
      this.render()
    }
  }

  isVisible(): boolean {
    return this.visible
  }

  getBaseCls(): string {
    return this.baseCls
  }

  createNode(): HTMLElement {
    return document.createElement('div')
  }

  getBoxElem(): HTMLElement {
    if (!this.boxElem) {
      this.boxElem = this.createNode()

      if (this.getBaseCls()) {
        this.boxElem.classList.add(this.getBaseCls())
      }
    }

    return this.boxElem
  }

  getContentElem(): HTMLElement {
    if (!this.contentElem) {
      this.contentElem = this.createNode()

      if (this.getBaseCls()) {
        this.contentElem.classList.add(`${this.getBaseCls()}__content`)
      }

      this.getBoxElem().appendChild(this.contentElem)
    }

    return this.contentElem
  }

  render(renderTo?: HTMLElement) {
    if (!renderTo && !this.renderTo) {
      throw Error('Please provide parent node to render widget')
    }

    if (this.isRendered()) {
      return
    }

    let renderToNode = this.renderTo
    if (renderTo) {
      renderToNode = renderTo
    }

    this.fire('before:render')

    const boxElem = this.getBoxElem()

    if (!this.visible) {
      boxElem.style.display = 'none'
      boxElem.style.opacity = '0'
    }

    if (this.content) {
      this.setContent(this.content)
    }

    renderToNode.appendChild(boxElem)

    this.fire('render')

    if (this.visible) {
      this.visible = false
      this.show()
    }
  }

  isRendered(): boolean {
    return this.boxElem && document.body.contains(this.boxElem)
  }

  show() {
    if (this.isVisible()) {
      return
    }

    this.fire('before:show')
    this.visible = true

    const boxElem = this.getBoxElem()
    boxElem.style.display = 'block'

    setTimeout(() => {
      boxElem.style.opacity = '1'
    })
    setTimeout(() => this.fire('show'), this.animationDelay)
  }

  hide() {
    if (!this.isVisible()) {
      return
    }

    this.fire('before:hide')
    this.visible = false

    const boxElem = this.getBoxElem()
    boxElem.style.opacity = '0'

    setTimeout(() => {
      boxElem.style.display = 'none'

      this.fire('hide')
    },         this.animationDelay)
  }

  addCls(cls: string) {
    this.getBoxElem().classList.add(cls)
  }

  removeCls(cls: string) {
    this.getBoxElem().classList.remove(cls)
  }

  setContent(content: string | number, safe = false) {
    this.content = content

    if (safe) {
      this.getContentElem().innerText = content.toString()
    } else {
      this.getContentElem().innerHTML = content.toString()
    }
  }
}
