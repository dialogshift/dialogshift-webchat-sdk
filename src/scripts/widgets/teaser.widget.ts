import { BaseWidget, BaseWidgetOptions } from '../core/base-widget'
import { config } from '../config/config'
import { CustidStoreMode } from '../enums';

interface TeaserWidgetOptions extends BaseWidgetOptions {
  showTeaserOnce: boolean
  hideTeaserAfterTimes: number
  custidStoreMode: CustidStoreMode
}

export class TeaserWidget extends BaseWidget {
  private crossElem: HTMLElement
  private showTeaserOnce: boolean
  private hideTeaserAfterTimes: number
  private custidStoreMode: CustidStoreMode

  constructor(options: TeaserWidgetOptions) {
    super(options)
    this.custidStoreMode = options.custidStoreMode
  }

  getBaseCls(): string {
    return config.teaserCls
  }

  render() {
    this.crossElem = this.createNode()
    this.crossElem.classList.add(config.teaserCrossCls)
    this.crossElem.tabIndex = 0
    this.crossElem.ariaLabel = 'Close Chat Teaser'

    this.bindEvents()

    this.getBoxElem().appendChild(this.crossElem)

    super.render()
  }

  checkTimes(): boolean {
    if (this.hideTeaserAfterTimes === undefined) {
      return true
    }

    let timesCounter = 0

    if (this.custidStoreMode === CustidStoreMode.cookie) {
      let storedTimesCounter: string | null = null
      try {
        storedTimesCounter = sessionStorage.getItem('ds-times-counter')
      } catch (e) {
        console.log('Session storage blocked.')
      }
      if (storedTimesCounter !== null) {
        timesCounter = parseInt(storedTimesCounter, 10)
      }
    }

    timesCounter += 1

    if (timesCounter > this.hideTeaserAfterTimes) {
      return false
    }

    if (this.custidStoreMode === CustidStoreMode.cookie) {
      try {
        sessionStorage.setItem('ds-times-counter', timesCounter.toString())
      } catch (e) {
        console.log('Session storage blocked.')
      }
    }

    return true
  }

  show(options = { force: false }): void {
    if (options.force) {
      super.show()
      return
    }

    if (!this.checkTimes()) {
      this.hideNode()
      return
    }

    let teaserDisplay: string | null = null
    if (this.custidStoreMode === CustidStoreMode.cookie) {
      try {
        teaserDisplay = sessionStorage.getItem('ds-teaser-display')
      } catch (e) {
        console.log('Session storage blocked.')
      }
    }
    if (this.showTeaserOnce && teaserDisplay !== null) {
      return
    }

    super.show()

    if (this.custidStoreMode === CustidStoreMode.cookie) {
      try {
        sessionStorage.setItem('ds-teaser-display', 'true')
      } catch (e) {
        console.log('Session storage blocked.')
      }
    }
  }

  bindEvents() {
    this.crossElem.addEventListener('click', (event: MouseEvent) => {
      event.stopPropagation()
      this.hide()
    })
    this.crossElem.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        event.stopPropagation()
        this.hide()
      }
    })

    this.getBoxElem().addEventListener('click', () => this.fire('click'))
    this.getBoxElem().addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.fire('click')
      }
    })
  }
}
