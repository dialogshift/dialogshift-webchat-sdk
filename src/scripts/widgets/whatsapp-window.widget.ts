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
  textLinkMobileCls: 'ds-whatsapp-window__text-link-mobile',
  qr: 'ds-whatsapp-window__qr',
  linkCls: 'ds-whatsapp-window__link',
  crossCls: 'ds-whatsapp-window__cross',
}

const texts = {
  en: {
    title: 'Use WhatsApp',
    description: 'Scan the QR code with your phone',
    linkText: 'or click the link below',
    linkMobileText: 'Click the button below to connect WhatsApp',
    link: 'Open WhatsApp',
  },
  de: {
    title: 'Benutze WhatsApp',
    description: 'Scanne den QR Code mit Deinem Smartphone',
    linkText: 'oder klicke diesen Link an',
    linkMobileText: 'Klicke den Button um WhatsApp zu öffnen',
    link: 'WhatsApp öffnen',
  },
}

const getText = (locale: string, key: string) => {
  let lg = locale

  if (lg !== 'de' && lg !== 'en') {
    lg = 'en'
  }

  return texts[lg][key]
}

interface WhatsappWindowWidgetOptions extends BaseWidgetOptions {
  clientId: string
  locale?: string
}

export class WhatsappWindowWidget extends BaseWidget {
  private crossElem: HTMLElement
  private isLoaded = false
  private clientId: string
  private waSvg: string
  private waLink: string
  private locale = 'en'

  constructor(options: WhatsappWindowWidgetOptions) {
    super(options)

    this.clientId = options.clientId

    if (options.locale) {
      this.locale = options.locale
    }

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
    const title = `<div class="${config.titleCls}">${getText(
      this.locale,
      'title',
    )}</div>`
    const description = `<div class="${config.textCls}">${getText(
      this.locale,
      'description',
    )}</div>`
    const qr = `<div class="${config.qr}">${this.waSvg}</div>`
    const linkText = `<div class="${config.textLinkCls}">${getText(
      this.locale,
      'linkText',
    )}</div>`
    const linkMobileText = `<div class="${config.textLinkMobileCls}">${getText(
      this.locale,
      'linkMobileText',
    )}</div>`
    const link = `<a class="${config.linkCls}" href="${
      this.waLink
    }" target="_blank">${getText(this.locale, 'link')}</a>`

    this.setContent(title + description + qr + linkText + linkMobileText + link)
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
