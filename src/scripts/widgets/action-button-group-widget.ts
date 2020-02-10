import { BaseWidgetOptions, BaseWidget, BaseWidgetDisplayMode } from '../core/base-widget'
import { config } from '../config/config'
import { ActionButtonWidget, ActionButtonWidgetType, ActionButtonWidgetOptions } from './action-button-widget'

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

  addButton(buttonOptions: ActionButtonWidgetOptions) {
    if (!this.getButton(buttonOptions.id)) {
      const button = new ActionButtonWidget({
        renderTo: this.getBoxElem(),
        ...buttonOptions,
      })

      this.buttons.push(button)
    }
  }

  getButton(id: string): boolean {
    return this.buttons.find(item => item.getId() === id) !== undefined
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
