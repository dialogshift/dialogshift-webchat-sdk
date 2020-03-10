import { BaseWidgetOptions, BaseWidget } from '../core/base-widget'
import { config } from '../config/config'
import { ActionButton, ActionButtonType } from '../models'
import { App } from '../core/app'

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
    if (this.actionButton.getType() === ActionButtonType.quickreply) {
      this.getBoxElem().addEventListener('click', () => {
        this.app.triggerElement({
          successor: this.actionButton.getSuccessor(),
        })
      })
    }

    if (this.actionButton.getType() === ActionButtonType.callback) {
      this.getBoxElem().addEventListener('click', () => {
        const callback = this.actionButton.getCallback()
        callback()
      })
    }
  }

  render() {
    super.render()

    this.bindEvents()
  }

  getBaseCls() {
    return config.actionButtonCls
  }
}
