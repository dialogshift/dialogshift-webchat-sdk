import { BaseWidgetOptions, BaseWidget } from '../core/base-widget'
import { config } from '../config/config'

interface IframeWidgetOptions extends BaseWidgetOptions {
  host: string
  id: string
  customerId?: string
}

export class IframeWidget extends BaseWidget {
  private host: string
  private id: string
  private customerId: string
  private loaded = false

  constructor(options: IframeWidgetOptions) {
    super(options)
  }

  getBaseCls(): string {
    return config.iframeCls
  }

  getBoxElem(): HTMLIFrameElement {
    return super.getBoxElem() as HTMLIFrameElement
  }

  isLoaded(): boolean {
    return this.loaded
  }

  createNode(): HTMLIFrameElement {
    return document.createElement('iframe')
  }

  buildUrl(): string {
    let iframeUrl = `${this.host}?clid=${this.id}`

    if (this.customerId) {
      iframeUrl += `&cid=${this.customerId}`
    }

    return iframeUrl
  }

  load() {
    if (this.isRendered() && !this.loaded) {
      this.loaded = true
      this.getBoxElem().src = this.buildUrl()
    }
  }
}
