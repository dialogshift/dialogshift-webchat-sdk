import { BaseWidgetOptions, BaseWidget } from '../core/base-widget'
import { config } from '../config/config'

interface IframeWidgetOptions extends BaseWidgetOptions {
  host: string
  id: string
  customerId?: string
  initialElement?: string
  locale?: string
}

export class IframeWidget extends BaseWidget {
  private host: string
  private id: string
  private customerId: string
  private loaded = false
  private initialElement: string
  private locale: string

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

    if (this.initialElement) {
      iframeUrl += `&init=${this.initialElement}`
    }

    if (this.locale) {
      iframeUrl += `&lg=${this.locale}`
    }

    return iframeUrl
  }

  load() {
    if (this.isRendered() && !this.loaded) {
      this.loaded = true
      this.getBoxElem().src = this.buildUrl()

      this.getBoxElem().addEventListener('load', () => {
        this.getBoxElem().contentWindow.postMessage(
          {
            type: 'setConfig',
            payload: {
              theme: 'theme-embed',
            },
          },
          '*',
        )
      })
    }
  }

  removeInitialElement() {
    this.initialElement = ''
  }

  setContent() {
    throw new Error('Method is not allowed for an iframe')
  }

  getContentElem(): HTMLElement {
    throw new Error('Method is not allowed for an iframe')
  }
}
