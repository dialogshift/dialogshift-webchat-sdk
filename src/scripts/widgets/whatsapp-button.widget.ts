import { BaseWidgetOptions, BaseWidget } from '../core/base-widget'

const config = {
  baseCls: 'ds-whatsapp-button',
  activeCls: 'ds-whatsapp-button--active',
}

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

  toggle(state?: boolean, suppressEvent = false): void {
    const isPressed = state === undefined ? !this.isPressed : !!state

    if (isPressed === this.isPressed) {
      return
    }

    this.isPressed = isPressed

    if (isPressed) {
      this.getBoxElem().classList.add(config.activeCls)
    } else {
      this.getBoxElem().classList.remove(config.activeCls)
    }

    if (!suppressEvent) {
      this.fire('toggle', {
        isPressed,
      })
    }
  }

  getBaseCls(): string {
    return config.baseCls
  }
}
