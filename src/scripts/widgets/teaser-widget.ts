import { BaseWidgetOptions, BaseWidget } from '../core/base-widget'
import { config } from '../config/config'
import { CookieService } from '../services/cookie.service'

interface TeaserWidgetOptions extends BaseWidgetOptions {
  showTeaserOnce: boolean
  hideTeaserAfterTimes: number
}

export class TeaserWidget extends BaseWidget {
  private crossElem: HTMLElement
  private showTeaserOnce: boolean
  private hideTeaserAfterTimes: number

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

  checkTimes(): boolean {
    if (this.hideTeaserAfterTimes === undefined) {
      return true
    }

    let timesCounter = 0

    if (CookieService.get('times-counter') !== null) {
      timesCounter = parseInt(CookieService.get('times-counter'), 10)
    }

    timesCounter += 1

    if (timesCounter > this.hideTeaserAfterTimes) {
      return false
    }

    CookieService.set('times-counter', timesCounter)

    return true
  }

  show(): void {
    if (!this.checkTimes()) {
      return
    }

    if (this.showTeaserOnce && CookieService.get('teaser-display') !== null) {
      return
    }

    super.show()

    CookieService.set('teaser-display', 'true')
  }

  bindEvents() {
    this.crossElem.addEventListener('click', (event: MouseEvent) => {
      event.stopPropagation()
      this.hide()
    })

    this.getBoxElem().addEventListener('click', () => this.fire('click'))
  }
}
