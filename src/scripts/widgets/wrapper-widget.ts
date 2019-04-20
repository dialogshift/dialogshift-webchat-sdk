import { ChatPosition } from '../core/app'
import { BaseWidgetOptions, BaseWidget } from '../core/base-widget'
import { config } from '../config/config'

interface WrapperWidgetOptions extends BaseWidgetOptions {
  position?: ChatPosition
}

export class WrapperWidget extends BaseWidget {
  private position: ChatPosition

  constructor(options: WrapperWidgetOptions) {
    super(options)
  }

  getBaseCls() {
    return config.wrapperCls
  }

  setPosition(position: ChatPosition) {
    this.position = position

    const boxElem = this.getBoxElem()

    boxElem.classList.remove(config.wrapperPositionLeftCls)
    boxElem.classList.remove(config.wrapperPositionRightCls)

    boxElem.classList.add(
      position === ChatPosition.left
        ? config.wrapperPositionLeftCls
        : config.wrapperPositionRightCls,
    )
  }

  render() {
    this.setPosition(this.position)

    super.render()
  }
}
