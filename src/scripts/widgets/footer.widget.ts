import { BaseWidgetOptions, BaseWidget } from '../core/base-widget'

const config = {
  baseCls: 'ds-footer',
}

export class FooterWidget extends BaseWidget {
  constructor(options: BaseWidgetOptions) {
    super(options)
  }

  getBaseCls(): string {
    return config.baseCls
  }
}
