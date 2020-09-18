import { BaseWidgetOptions, BaseWidget } from '../core/base-widget'
import { config } from '../config/config'

export class ContentWrapperWidget extends BaseWidget {
  protected visible = false

  constructor(options: BaseWidgetOptions) {
    super(options)
  }

  getBaseCls(): string {
    return config.contentWrapperCls
  }
}
