import { BaseWidgetOptions, BaseWidget } from '../core/base-widget'
import { config } from '../config/config'
import { CookieService } from '../services/cookie.service'

interface TeaserWidgetOptions extends BaseWidgetOptions {
  showTeaserOnce: boolean
}

export class TeaserWidget extends BaseWidget {
  private crossElem: HTMLElement
  private showTeaserOnce: boolean

  constructor(options: TeaserWidgetOptions) {
    super(options)
  }

  getBaseCls() {
    return config.teaserCls
  }

  render() {
    this.crossElem = this.createNode()
    this.crossElem.classList.add(config.teaserCrossCls)

    this.bindEvents()

    this.getBoxElem().appendChild(this.crossElem)

    super.render()
  }

  show() {
    if (this.showTeaserOnce && CookieService.get('teaser-display') !== null) {
      return
    }

    super.show()

    CookieService.set('teaser-display', 'true')
  }

  bindEvents() {
    this.crossElem.addEventListener('click', event => {
      event.stopPropagation()
      this.hide()
    })

    this.getBoxElem().addEventListener('click', () => this.fire('click'))
  }
}
