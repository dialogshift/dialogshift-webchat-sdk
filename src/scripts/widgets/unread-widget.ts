import { BaseWidgetOptions, BaseWidget } from '../core/base-widget'
import { config } from '../config/config'

export class UnreadWidget extends BaseWidget {
  private unreadCounter = 0

  constructor(options: BaseWidgetOptions) {
    super(options)
  }

  getBaseCls() {
    return config.unreadCls
  }

  increase(amount = 1) {
    this.unreadCounter += amount
    this.setContent(this.unreadCounter)

    if (!this.isVisible()) {
      this.show()
    }
  }

  reset() {
    this.unreadCounter = 0

    if (this.isVisible()) {
      this.hide()
      setTimeout(() => this.setContent(this.unreadCounter), this.animationDelay)
    }
  }
}
