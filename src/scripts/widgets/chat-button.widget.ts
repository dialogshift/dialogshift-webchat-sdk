import { BaseWidgetOptions, BaseWidget } from '../core/base-widget'
import { config } from '../config/config'

type ChatButtonWidgetState = 'default' | 'active'

export class ChatButtonWidget extends BaseWidget {
  private pressed = false

  constructor(options: BaseWidgetOptions) {
    super(options)
  }

  private bindEvents() {
    this.getBoxElem().addEventListener('click', () => {
      this.pressed = !this.pressed

      this.fire('toggle', {
        isPressed: this.pressed,
      })
    })
  }

  getBaseCls(): string {
    return config.buttonCls
  }

  render() {
    const boxElem = this.getBoxElem()
    boxElem.classList.add(config.buttonLogoCls)

    this.bindEvents()

    super.render()
  }

  setState(state: ChatButtonWidgetState) {
    if (state === 'active') {
      this.pressed = true
      this.getBoxElem().classList.add(config.buttonActiveCls)
    }

    if (state === 'default') {
      this.pressed = false
      this.getBoxElem().classList.remove(config.buttonActiveCls)
    }
  }

  setContent(text: string) {
    super.setContent(text)

    if (text) {
      this.getBoxElem().classList.add(config.buttonWithTextCls)
    } else {
      this.getBoxElem().classList.remove(config.buttonWithTextCls)
    }
  }
}
