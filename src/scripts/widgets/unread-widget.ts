import { BaseWidgetOptions, BaseWidget } from '../core/base-widget'
import { config } from '../config/config'

export class UnreadWidget extends BaseWidget {
  constructor(options: BaseWidgetOptions) {
    super(options)
  }

  getBaseCls() {
    return config.unreadCls
  }
}
