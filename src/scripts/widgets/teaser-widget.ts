import { BaseWidgetOptions, BaseWidget } from '../core/base-widget'
import { config } from '../config/config'

export class TeaserWidget extends BaseWidget {
  private crossElem: HTMLElement

  constructor(options: BaseWidgetOptions) {
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

  bindEvents() {
    this.crossElem.addEventListener('click', event => {
      event.stopPropagation()
      this.hide()
    })

    this.getBoxElem().addEventListener('click', () => this.fire('click'))
  }
}
