import { BaseWidgetOptions, BaseWidget, BaseWidgetDisplayMode } from '../core/base-widget'
import { config } from '../config/config'
import { ActionButtonWidget } from './action-button-widget'
import { ActionButton } from '../models'
import { MixedObject } from '../types'

export class ActionButtonGroupWidget extends BaseWidget {
  private buttons: ActionButtonWidget[] = []

  constructor(options: BaseWidgetOptions) {
    super(options)
  }

  getBaseCls() {
    return config.actionButtonGroupCls
  }

  getDisplayMode(): BaseWidgetDisplayMode {
    return 'flex'
  }

  addButton(options: MixedObject) {
    const button = new ActionButtonWidget({
      locale: options.locale,
      actionButton: ActionButton.fromJson(options),
      renderTo: this.getBoxElem(),
      app: options.app,
    })

    this.buttons.push(button)
  }

  clearButtons() {
    this.buttons.forEach((item: ActionButtonWidget) => item.destroy())
  }

  protected showNode() {
    const boxElem = this.getBoxElem()

    boxElem.style.display = this.getDisplayMode()

    setTimeout(() => {
      boxElem.style.maxHeight = '100px'
    })

    setTimeout(() => {
      boxElem.style.opacity = '1'
    }, 250)

    setTimeout(() => {
      boxElem.style.overflowY = 'visible'
      boxElem.style.maxHeight = 'auto'
    }, 500)
  }

  protected hideNode() {
    const boxElem = this.getBoxElem()

    boxElem.style.overflowY = 'hidden'
    boxElem.style.opacity = '0'

    setTimeout(() => (boxElem.style.maxHeight = '0'), 250)
    setTimeout(() => (boxElem.style.display = 'none'), 500)
  }
}
