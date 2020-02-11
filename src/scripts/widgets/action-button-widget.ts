import { BaseWidgetOptions, BaseWidget } from '../core/base-widget'
import { config } from '../config/config'
import { ActionButton } from '../models'
import { App } from '../core/app'

export enum ActionButtonWidgetType {
  quickreply = 'quickreply',
}

export interface ActionButtonWidgetOptions extends BaseWidgetOptions {
  actionButton: ActionButton
  locale: string
  app: App
}

export class ActionButtonWidget extends BaseWidget {
  private actionButton: ActionButton
  private locale: string
  private app: App

  constructor(options: ActionButtonWidgetOptions) {
    super(options)

    this.setContent(this.actionButton.getTitle(this.locale))
  }

  private bindEvents() {
    this.getBoxElem().addEventListener('click', () => {
      this.app.triggerElement({
        successor: this.actionButton.getSuccessor()
      })
    })
  }

  render() {
    super.render()

    this.bindEvents()
  }

  getBaseCls() {
    return config.actionButtonCls
  }
}
