import { BaseWidgetOptions, BaseWidget } from '../../core/base-widget'
import { config } from '../../config/config'

export class HeaderCloseButtonWidget extends BaseWidget {
  constructor(options: BaseWidgetOptions) {
    super(options)
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
    return config.headerCloseButtonCls
  }
}
