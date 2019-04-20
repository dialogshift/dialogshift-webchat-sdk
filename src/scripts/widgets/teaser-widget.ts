import { BaseWidgetOptions, BaseWidget } from '../core/base-widget'
import { config } from '../config/config'

interface TeaserWidgetOptions extends BaseWidgetOptions {
  text?: string
}

export class TeaserWidget extends BaseWidget {
  private text: string

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

    super.render()
  }

  setText(text: string) {
    this.text = text

    this.getBoxElem().innerText = text
  }
}
