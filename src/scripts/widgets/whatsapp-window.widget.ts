import { BaseWidgetOptions, BaseWidget } from '../core/base-widget'
import { isHttpUrl } from '../core/utils'
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
  linkTestCls: 'ds-whatsapp-window__link-text',
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
    title: 'WhatsApp',
    description: 'QR-Code mit dem Smartphone scannen',
    linkText: 'auf dem Computer auch mit diesem Link',
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

const createElem = (tag: string, cls: string, text?: string): HTMLElement => {
  const elem = document.createElement(tag)
  elem.classList.add(cls)

  if (text !== undefined) {
    elem.textContent = text
  }

  return elem
}

// waSvg is an img tag with the QR code as data URL, only its image source is used
const getQrImageSrc = (html: string): string | null => {
  const img = new DOMParser()
    .parseFromString(html || '', 'text/html')
    .querySelector('img')
  const src = img ? img.getAttribute('src') : null

  return src !== null && src.indexOf('data:image/') === 0 ? src : null
}

interface WhatsappWindowWidgetOptions extends BaseWidgetOptions {
  clientId: string
  locale?: string
}

export class WhatsappWindowWidget extends BaseWidget {
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
        UserService.getCustomerId() as string,
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

  // The link contains the start message configured by the hotel, so the content is built as DOM nodes and not as HTML
  private renderContent() {
    const qr = createElem('div', config.qr)
    const qrSrc = getQrImageSrc(this.waSvg)

    if (qrSrc !== null) {
      const img = document.createElement('img')
      img.src = qrSrc
      qr.appendChild(img)
    }

    const link = createElem('a', config.linkCls) as HTMLAnchorElement

    if (typeof this.waLink === 'string' && isHttpUrl(this.waLink)) {
      link.href = this.waLink
    }
    link.target = '_blank'
    link.rel = 'noopener'
    link.appendChild(
      createElem('span', config.linkTestCls, getText(this.locale, 'link')),
    )

    const contentElem = this.getContentElem()
    contentElem.textContent = ''
    contentElem.appendChild(
      createElem('div', config.titleCls, getText(this.locale, 'title')),
    )
    contentElem.appendChild(
      createElem('div', config.textCls, getText(this.locale, 'description')),
    )
    contentElem.appendChild(qr)
    contentElem.appendChild(
      createElem('div', config.textLinkCls, getText(this.locale, 'linkText')),
    )
    contentElem.appendChild(
      createElem(
        'div',
        config.textLinkMobileCls,
        getText(this.locale, 'linkMobileText'),
      ),
    )
    contentElem.appendChild(link)
  }

  getBaseCls(): string {
    return config.baseCls
  }

  setLocale(locale: string) {
    this.locale = locale

    if (this.isLoaded) {
      this.renderContent()
    }
  }
}
