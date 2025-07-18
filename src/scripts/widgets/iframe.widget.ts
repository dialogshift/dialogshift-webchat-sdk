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

    this.initialElement = options.initialElement as InitialElement
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
    const node = document.createElement('iframe')
    node.sandbox.add('allow-downloads')
    node.sandbox.add('allow-forms')
    node.sandbox.add('allow-modals')
    node.sandbox.add('allow-pointer-lock')
    node.sandbox.add('allow-popups')
    node.sandbox.add('allow-popups-to-escape-sandbox')
    node.sandbox.add('allow-presentation')
    node.sandbox.add('allow-same-origin')
    node.sandbox.add('allow-scripts')
    node.sandbox.add('allow-storage-access-by-user-activation')
    node.sandbox.add('allow-top-navigation')
    node.sandbox.add('allow-top-navigation-by-user-activation')
    node.sandbox.add('allow-top-navigation-to-custom-protocols')
    return node
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

  getInitialElement(): InitialElement {
    return this.initialElement
  }

  setInitialElement(initialElement: InitialElement) {
    this.initialElement = initialElement
  }
}
