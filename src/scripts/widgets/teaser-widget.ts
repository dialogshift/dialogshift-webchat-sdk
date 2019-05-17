import { BaseWidgetOptions, BaseWidget } from '../core/base-widget'
import { config } from '../config/config'

interface TeaserWidgetOptions extends BaseWidgetOptions {
  text?: string
}

export class TeaserWidget extends BaseWidget {
  private text: string
  private crossElem: HTMLElement
  private textElem: HTMLElement

  constructor(options: TeaserWidgetOptions) {
    super(options)
  }

  getBaseCls() {
    return config.teaserCls
  }

  render() {
    this.crossElem = this.createNode()
    this.crossElem.classList.add(config.teaserCrossCls)

    this.textElem = this.createNode()
    this.textElem.classList.add(config.teaserTextCls)

    this.bindEvents()

    this.getBoxElem().appendChild(this.crossElem)
    this.getBoxElem().appendChild(this.textElem)

    if (this.text) {
      this.setText(this.text)
    }

    super.render()
  }

  bindEvents() {
    this.crossElem.addEventListener('click', () => {
      this.hide()
    })
  }

  setText(text: string) {
    this.text = text

    this.textElem.innerHTML = text
  }
}
