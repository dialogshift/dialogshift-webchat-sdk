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

    let storedTimesCounter = null
    try {
      storedTimesCounter = sessionStorage.getItem('ds-times-counter')
    } catch (e) {
      console.log('Session storage blocked.')
    }
    if (storedTimesCounter !== null) {
      timesCounter = parseInt(storedTimesCounter, 10)
    }

    timesCounter += 1

    if (timesCounter > this.hideTeaserAfterTimes) {
      return false
    }

    try {
      sessionStorage.setItem('ds-times-counter', timesCounter.toString())
    } catch (e) {
      console.log('Session storage blocked.')
    }

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

    let teaserDisplay = null
    try {
      teaserDisplay = sessionStorage.getItem('ds-teaser-display')
    } catch (e) {
      console.log('Session storage blocked.')
    }
    if (this.showTeaserOnce && teaserDisplay !== null) {
      return
    }

    super.show()

    try {
      sessionStorage.setItem('ds-teaser-display', 'true')
    } catch (e) {
      console.log('Session storage blocked.')
    }
  }

  bindEvents() {
    this.crossElem.addEventListener('click', (event: MouseEvent) => {
      event.stopPropagation()
      this.hide()
    })

    this.getBoxElem().addEventListener('click', () => this.fire('click'))
  }
}
