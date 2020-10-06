import { BaseWidgetOptions, BaseWidget } from '../core/base-widget'

const config = {
  baseCls: 'ds-whatsapp-button',
  activeCls: 'ds-whatsapp-button--active',
}

type WhatsappButtonWidgetState = 'default' | 'active'

export class WhatsappButtonWidget extends BaseWidget {
  private isPressed = false

  constructor(options: BaseWidgetOptions) {
    super(options)
  }

  private bindEvents() {
    this.getBoxElem().addEventListener('click', () => {
      this.toggle()
    })
  }

  render() {
    super.render()

    this.bindEvents()
  }

  toggle() {
    if (this.isPressed) {
      this.setState('default')
    } else {
      this.setState('active')
    }

    this.fire('toggle', {
      isPressed: this.isPressed,
    })
  }

  setState(state: WhatsappButtonWidgetState) {
    if (state === 'active') {
      this.isPressed = true
      this.getBoxElem().classList.add(config.activeCls)
    }

    if (state === 'default') {
      this.isPressed = false
      this.getBoxElem().classList.remove(config.activeCls)
    }
  }

  getBaseCls(): string {
    return config.baseCls
  }
}
