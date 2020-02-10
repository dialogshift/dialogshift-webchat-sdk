import { BaseWidgetOptions, BaseWidget } from '../core/base-widget'
import { config } from '../config/config'

export enum ActionButtonWidgetType {
  reply = 'reply',
}

export interface ActionButtonWidgetOptions extends BaseWidgetOptions {
  id: string
}

export class ActionButtonWidget extends BaseWidget {
  private type: ActionButtonWidgetType
  private id: string

  constructor(options: ActionButtonWidgetOptions) {
    super(options)
  }

  getBaseCls() {
    return config.actionButtonCls
  }

  getId(): string {
    return this.id
  }
}
