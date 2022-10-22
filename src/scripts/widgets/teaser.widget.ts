import { BaseWidgetOptions, BaseWidget } from '../core/base-widget'
import { config } from '../config/config'

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

  getBaseCls(): string {
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

    if (sessionStorage.getItem('ds-times-counter') !== null) {
      timesCounter = parseInt(sessionStorage.getItem('ds-times-counter'), 10)
    }

    timesCounter += 1

    if (timesCounter > this.hideTeaserAfterTimes) {
      return false
    }

    sessionStorage.setItem('ds-times-counter', timesCounter.toString())

    return true
  }

  show(options = { force: false }): void {
    if (options.force) {
      super.show()
      return
    }

    if (!this.checkTimes()) {
      return
    }

    if (this.showTeaserOnce && sessionStorage.getItem('ds-teaser-display') !== null) {
      return
    }

    super.show()

    sessionStorage.setItem('ds-teaser-display', 'true')
  }

  bindEvents() {
    this.crossElem.addEventListener('click', (event: MouseEvent) => {
      event.stopPropagation()
      this.hide()
    })

    this.getBoxElem().addEventListener('click', () => this.fire('click'))
  }
}
