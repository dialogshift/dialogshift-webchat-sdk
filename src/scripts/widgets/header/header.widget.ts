import {
  BaseWidgetOptions,
  BaseWidget,
  BaseWidgetDisplayMode
} from '../../core/base-widget'
import { config } from '../../config/config'
import { HeaderCloseButtonWidget } from './header-close-button.widget'

interface HeaderWidgetOptions extends BaseWidgetOptions {
  leftCloseButton: boolean
}

export class HeaderWidget extends BaseWidget {
  private closeButton: HeaderCloseButtonWidget
  private leftCloseButton: boolean

  constructor(options: HeaderWidgetOptions) {
    super(options)
    this.leftCloseButton = options.leftCloseButton
  }

  getBaseCls(): string {
    return config.headerCls
  }

  getDisplayMode(): BaseWidgetDisplayMode {
    return 'flex'
  }

  renderCloseButton() {
    this.closeButton = new HeaderCloseButtonWidget({
      renderTo: this.getBoxElem(),
      leftCloseButton: this.leftCloseButton,
    })
  }

  getCloseButton(): HeaderCloseButtonWidget {
    return this.closeButton
  }

  render(renderTo?: HTMLElement) {
    super.render(renderTo)

    this.renderCloseButton()
  }
}
