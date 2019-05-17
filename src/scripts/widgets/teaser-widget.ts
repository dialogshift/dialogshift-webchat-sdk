import { BaseWidgetOptions, BaseWidget } from '../core/base-widget'
import { config } from '../config/config'

interface TeaserWidgetOptions extends BaseWidgetOptions {
  text?: string
}

export class TeaserWidget extends BaseWidget {
  private text: string
  private crossElem: HTMLElement

  constructor(options: TeaserWidgetOptions) {
    super(options)
  }

  getBaseCls() {
    return config.teaserCls
  }

  render() {
    if (this.text) {
      this.setText(this.text)
    }

    this.crossElem = this.createNode()
    this.crossElem.classList.add(config.teaserCrossCls)
    this.bindEvents()

    this.getBoxElem().appendChild(this.crossElem)

    super.render()
  }

  bindEvents() {
    this.crossElem.addEventListener('click', () => {
      this.hide()
    })
  }

  setText(text: string) {
    this.text = text

    this.getBoxElem().innerHTML = text
  }
}
