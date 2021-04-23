import { ChatPosition, AppTheme } from '../core/app'
import { BaseWidgetOptions, BaseWidget } from '../core/base-widget'
import { config } from '../config/config'

interface WrapperWidgetOptions extends BaseWidgetOptions {
  position: ChatPosition
  theme: AppTheme
  direction: 'rtl' | 'ltr'
  baseCustomCls?: string
}

export class WrapperWidget extends BaseWidget {
  private position: ChatPosition
  private theme: AppTheme
  private direction: 'rtl' | 'ltr' = 'ltr'
  private baseCustomCls: string

  constructor(options: WrapperWidgetOptions) {
    super(options)
  }

  getBaseCls(): string {
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

  setTheme(theme: AppTheme): void {
    if (!(theme in AppTheme)) {
      return
    }

    this.theme = theme

    const boxElem = this.getBoxElem()
    const themeCls =
      config[`theme${theme.charAt(0).toUpperCase() + theme.slice(1)}`]

    boxElem.classList.remove(config.themeRound)
    boxElem.classList.remove(config.themeTile)
    boxElem.classList.add(themeCls)
  }

  render() {
    this.setPosition(this.position)
    this.setTheme(this.theme)

    if (this.direction === 'rtl') {
      this.getBoxElem().classList.add(config.wrapperDirectionRtlCls)
    }

    if (this.baseCustomCls) {
      this.getBoxElem().classList.add(this.baseCustomCls)
    }

    super.render()
  }
}
