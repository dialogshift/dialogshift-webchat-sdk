import { BaseWidgetOptions, BaseWidget } from '../core/base-widget'
import { ApiService, UserService } from '../services'
import { MixedObject } from '../types'

const config = {
  baseCls: 'ds-whatsapp-window',
  hideLoadingCls: 'ds-whatsapp-window--hide-loading',
  loadedCls: 'ds-whatsapp-window--loaded',
  titleCls: 'ds-whatsapp-window__title',
  textCls: 'ds-whatsapp-window__text',
  textLinkCls: 'ds-whatsapp-window__text-link',
  qr: 'ds-whatsapp-window__qr',
  linkCls: 'ds-whatsapp-window__link',
  crossCls: 'ds-whatsapp-window__cross',
}

interface WhatsappWindowWidgetOptions extends BaseWidgetOptions {
  clientId: string
}

export class WhatsappWindowWidget extends BaseWidget {
  private crossElem: HTMLElement
  private isLoaded = false
  private clientId: string
  private waSvg: string
  private waLink: string

  constructor(options: WhatsappWindowWidgetOptions) {
    super(options)

    this.clientId = options.clientId

    this.on('before:show', () => {
      this.loadQR()
    })
  }

  private loadQR() {
    if (!this.isLoaded) {
      this.isLoaded = true

      ApiService.getWhatsappLink(
        this.clientId,
        UserService.getCustomerId(),
      ).then((response: MixedObject) => {
        this.waLink = response.waLink
        this.waSvg = response.waSvg
        this.renderContent()

        this.addCls(config.hideLoadingCls)

        setTimeout(() => {
          this.addCls(config.loadedCls)
          this.removeCls(config.hideLoadingCls)
        }, 250)
      })
    }
  }

  private renderContent() {
    const title = `<div class="${config.titleCls}">Connect to WhatsApp</div>`
    const description = `<div class="${config.textCls}">Scan the QR code with your phone</div>`
    const qr = `<div class="${config.qr}">${this.waSvg}</div>`
    const linkText = `<div class="${config.textLinkCls}">or clicking the link below</div>`
    const link = `<a class="${config.linkCls}" href="${this.waLink}" target="_blank">Connect</a>`

    this.setContent(title + description + qr + linkText + link)
  }

  getBaseCls(): string {
    return config.baseCls
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
