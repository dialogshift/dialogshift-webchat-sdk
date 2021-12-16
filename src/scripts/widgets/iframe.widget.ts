import { InitialElement } from '../core/app'
import { BaseWidgetOptions, BaseWidget } from '../core/base-widget'
import { config } from '../config/config'

export interface IframeWidgetOptions extends BaseWidgetOptions {
  host: string
  id: string
  customerId?: string
  initialElement?: InitialElement
  locale?: string
  channel?: string
}

export class IframeWidget extends BaseWidget {
  private host: string
  private id: string
  private customerId: string
  private loaded = false
  private initialElement: InitialElement = {
    successor: null,
    suppress: false,
  }
  private locale: string
  private channel: string

  constructor(options: IframeWidgetOptions) {
    super(options)

    this.initialElement = options.initialElement
    this.channel = options.channel || 'pwa-embed'
  }

  getBaseCls(): string {
    return config.iframeCls
  }

  getBoxElem(): HTMLIFrameElement {
    return super.getBoxElem() as HTMLIFrameElement
  }

  setLoaded(value: boolean) {
    this.loaded = value
  }

  isLoaded(): boolean {
    return this.loaded
  }

  createNode(): HTMLIFrameElement {
    return document.createElement('iframe')
  }

  getViewportWidth(): number {
    return Math.max(
      document.documentElement.clientWidth || 0,
      window.innerWidth || 0,
    )
  }

  buildUrl(): string {
    let iframeUrl = `${this.host}?clid=${this.id}&cid=${this.customerId}`

    if (this.initialElement.suppress) {
      iframeUrl += '&init=suppress'
    } else if (this.initialElement.successor) {
      iframeUrl += `&init=${this.initialElement.successor}`
    }

    if (this.locale) {
      iframeUrl += `&lg=${this.locale}`
    }

    iframeUrl += `&source=${this.channel}`

    iframeUrl += `&viewport=${this.getViewportWidth()}`
    iframeUrl += `&curl=${location.origin + location.pathname}`

    return iframeUrl
  }

  load(customerId: string) {
    this.customerId = customerId

    if (this.isRendered()) {
      this.getBoxElem().src = this.buildUrl()
    }
  }

  setContent() {
    throw new Error('Method is not allowed for an iframe')
  }

  getContentElem(): null {
    return null
  }

  getInitialElement(): InitialElement {
    return this.initialElement
  }

  setInitialElement(initialElement: InitialElement) {
    this.initialElement = initialElement
  }
}
