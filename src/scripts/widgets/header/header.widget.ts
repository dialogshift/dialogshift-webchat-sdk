import {
  BaseWidgetOptions,
  BaseWidget,
  BaseWidgetDisplayMode
} from '../../core/base-widget'
import { config } from '../../config/config'
import { HeaderCloseButtonWidget } from './header-close-button.widget'

export class HeaderWidget extends BaseWidget {
  private closeButton: HeaderCloseButtonWidget

  constructor(options: BaseWidgetOptions) {
    super(options)
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
