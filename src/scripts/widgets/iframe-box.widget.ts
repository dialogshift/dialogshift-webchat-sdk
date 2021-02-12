import { BaseWidgetOptions, BaseWidget } from '../core/base-widget'
import { config } from '../config/config'

interface IframeBoxWidgetOptions extends BaseWidgetOptions {
  // host: string
}

export class IframeBoxWidget extends BaseWidget {
  private loaded = false
  private iFrame: HTMLIFrameElement

  constructor(options: IframeBoxWidgetOptions) {
    super(options)
  }

  getBaseCls(): string {
    return config.iframeBoxCls
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
}
