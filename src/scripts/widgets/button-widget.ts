import { BaseWidgetOptions, BaseWidget } from '../core/base-widget'
import { config } from '../config/config'

interface ButtonWidgetOptions extends BaseWidgetOptions {
  text?: string
}

type ButtonWidgetState = 'default' | 'active'

export class ButtonWidget extends BaseWidget {
  private text: string
  private pressed = false

  constructor(options: ButtonWidgetOptions) {
    super(options)
  }

  getBaseCls() {
    return config.buttonCls
  }

  render() {
    const boxElem = this.getBoxElem()
    boxElem.classList.add(config.buttonLogoCls)

    if (this.text) {
      this.setText(this.text)
    }

    this.bindEvents()

    super.render()
  }

  bindEvents() {
    this.getBoxElem().addEventListener('click', () => {
      this.pressed = !this.pressed

      this.fire('toggle', {
        isPressed: this.pressed,
      })
    })
  }

  setState(state: ButtonWidgetState) {
    if (state === 'active') {
      this.pressed = true
      this.getBoxElem().classList.add(config.buttonActiveCls)
    }

    if (state === 'default') {
      this.pressed = false
      this.getBoxElem().classList.remove(config.buttonActiveCls)
    }
  }

  setText(text: string) {
    this.text = text

    const boxElem = this.getBoxElem()
    boxElem.innerText = text

    if (text) {
      boxElem.classList.add(config.buttonWithTextCls)
    } else {
      boxElem.classList.remove(config.buttonWithTextCls)
    }
  }
}
