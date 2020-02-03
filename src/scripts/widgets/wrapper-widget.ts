import { ChatPosition, AppTheme } from '../core/app'
import { BaseWidgetOptions, BaseWidget } from '../core/base-widget'
import { config } from '../config/config'

interface WrapperWidgetOptions extends BaseWidgetOptions {
  position: ChatPosition
  theme: AppTheme
}

export class WrapperWidget extends BaseWidget {
  private position: ChatPosition
  private theme: AppTheme

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

  setTheme(theme: AppTheme) {
    this.theme = theme

    const boxElem = this.getBoxElem()

    boxElem.classList.remove(config.themeRound)
    boxElem.classList.remove(config.themeTile)

    const themeCls = config[`theme${theme.charAt(0).toUpperCase() + theme.slice(1)}`]

    if (themeCls) {
      boxElem.classList.add(themeCls)
    }
  }

  render() {
    this.setPosition(this.position)
    this.setTheme(this.theme)

    super.render()
  }
}
