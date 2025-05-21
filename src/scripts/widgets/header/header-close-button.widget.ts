import { BaseWidgetOptions, BaseWidget } from '../../core/base-widget'
import { config } from '../../config/config'

interface HeaderCloseButtonWidgetOptions extends BaseWidgetOptions {
  leftCloseButton: boolean
}

export class HeaderCloseButtonWidget extends BaseWidget {
  private readonly leftCloseButton: boolean

  constructor(options: HeaderCloseButtonWidgetOptions) {
    super(options)
    this.leftCloseButton = options.leftCloseButton
  }

  private bindEvents() {
    this.getBoxElem().addEventListener('click', () => {
      this.fire('click')
    })

    this.getBoxElem().addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.fire('click')
      }
    })
  }

  render() {
    super.render()

    this.getBoxElem().tabIndex = 0
    this.getBoxElem().ariaLabel = 'Close Chat'

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
