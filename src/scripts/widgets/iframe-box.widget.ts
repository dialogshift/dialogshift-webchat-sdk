import { BaseWidgetOptions, BaseWidget } from '../core/base-widget'

const config = {
  baseCls: 'ds-iframe-box',
  crossCls: 'ds-iframe-box__cross',
}

interface IframeBoxWidgetOptions extends BaseWidgetOptions {
  // host: string
}

export class IframeBoxWidget extends BaseWidget {
  private loaded = false
  private crossElem: HTMLElement
  private iframe: HTMLIFrameElement | null

  constructor(options: IframeBoxWidgetOptions) {
    super(options)
  }

  protected hideNode() {
    super.hideNode()
  }

  getBaseCls(): string {
    return config.baseCls
  }

  // getBoxElem(): HTMLIFrameElement {
  //   return super.getBoxElem() as HTMLIFrameElement
  // }

  isLoaded(): boolean {
    return this.loaded
  }

  // createNode(): HTMLIFrameElement {
  //   return document.createElement('iframe')
  // }

  load(url: string): IframeBoxWidget {
    if (!this.iframe) {
      this.iframe = document.createElement('iframe')
      this.iframe.src = url
      this.getBoxElem().appendChild(this.iframe)
    } else {
      this.iframe.src = url
    }

    return this
  }

  setContent() {
    throw new Error('Method is not allowed for an iframe')
  }

  getContentElem(): null {
    return null
  }

  render() {
    this.crossElem = this.createNode()
    this.crossElem.classList.add(config.crossCls)
    this.bindEvents()

    this.getBoxElem().appendChild(this.crossElem)

    super.render()
  }

  bindEvents() {
    this.crossElem.addEventListener('click', (event: MouseEvent) => {
      event.stopPropagation()
      this.iframe.parentNode.removeChild(this.iframe)
      this.iframe = null
      this.hide()
    })
  }
}
