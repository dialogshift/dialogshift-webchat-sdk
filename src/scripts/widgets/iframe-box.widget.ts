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

  constructor(options: IframeBoxWidgetOptions) {
    super(options)
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
    if (this.isRendered() && !this.loaded) {
      this.loaded = true
      const ifarme = document.createElement('iframe')
      ifarme.src = url
      this.getBoxElem().appendChild(ifarme)
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
      this.hide()
    })
  }
}
