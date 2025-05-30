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

    this.setLocale(this.locale)
  }

  private bindEvents() {
    if (this.actionButton.getType() === ActionButtonType.quickreply) {
      this.getBoxElem().addEventListener('click', () => {
        this.app.triggerElement({
          successor: this.actionButton.getSuccessor(),
          teaserButton: true,
        })
      })

      this.getBoxElem().addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          this.app.triggerElement({
            successor: this.actionButton.getSuccessor(),
            teaserButton: true,
          })
        }
      })
    }

    if (this.actionButton.getType() === ActionButtonType.callback) {
      this.getBoxElem().addEventListener('click', () => {
        const callback = this.actionButton.getCallback()
        callback()
      })

      this.getBoxElem().addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
          const callback = this.actionButton.getCallback()
          callback()
        }
      })
    }
  }

  render() {
    super.render()

    this.getBoxElem().tabIndex = 0

    this.bindEvents()
  }

  getBaseCls(): string {
    return config.actionButtonCls
  }

  setLocale(locale: string) {
    this.locale = locale

    let title = this.actionButton.getTitle(this.locale)

    if (!title) {
      title = 'Press me'
    }

    this.setContent(title)
  }
}
