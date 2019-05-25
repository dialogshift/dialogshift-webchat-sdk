import { BaseWidgetOptions, BaseWidget } from '../core/base-widget'
import { config } from '../config/config'

interface UnreadWidgetOptions extends BaseWidgetOptions {
  unreadCounter?: number
}

export class UnreadWidget extends BaseWidget {
  private unreadCounter = 0

  constructor(options: UnreadWidgetOptions) {
    super(options)

    if (options.unreadCounter) {
      this.increase(options.unreadCounter)
    }
  }

  getBaseCls() {
    return config.unreadCls
  }

  setCounter(amount: number) {
    if (amount < 1) {
      this.reset()
    } else {
      this.unreadCounter = amount
      this.setContent(this.unreadCounter)

      if (!this.isVisible()) {
        this.show()
      }
    }
  }

  increase(amount = 1) {
    if (amount < 1) {
      return
    }

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
