import { BaseWidgetOptions, BaseWidget } from '../../core/base-widget'
import { config } from '../../config/config'

interface HeaderCloseButtonWidgetOptions extends BaseWidgetOptions {
  leftCloseButton: boolean
}

export class HeaderCloseButtonWidget extends BaseWidget {
  private leftCloseButton: boolean

  constructor(options: HeaderCloseButtonWidgetOptions) {
    super(options)
    this.leftCloseButton = options.leftCloseButton
  }

  private bindEvents() {
    this.getBoxElem().addEventListener('click', () => {
      this.fire('click')
    })
  }

  render() {
    super.render()

    this.bindEvents()
  }

  getBaseCls(): string {
    let cls: string = config.headerCloseButtonCls
    if (this.leftCloseButton) {
      cls += ` ${config.headerCloseButtonLeftCls}`
    }

    return cls
  }
}
