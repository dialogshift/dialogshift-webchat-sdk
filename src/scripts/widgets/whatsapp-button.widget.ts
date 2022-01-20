import { BaseWidgetOptions, BaseWidget } from '../core/base-widget'

const config = {
  baseCls: 'ds-whatsapp-button',
  activeCls: 'ds-whatsapp-button--active',
  bwCls: 'ds-whatsapp-button--bw',
  slideCls: 'ds-whatsapp-button--slide',
}

interface WhatsappButtonWidgetOptions extends BaseWidgetOptions {
  blackWhiteStyle?: boolean
  slideWaButton?: boolean
}

export class WhatsappButtonWidget extends BaseWidget {
  private isPressed = false
  private blackWhiteStyle = false
  private slideWaButton = false

  constructor(options: WhatsappButtonWidgetOptions) {
    super(options)
  }

  private bindEvents() {
    this.getBoxElem().addEventListener('click', () => {
      this.toggle()
    })
  }

  render() {
    if (this.blackWhiteStyle) {
      const boxElem = this.getBoxElem()
      boxElem.classList.add(config.bwCls)
    }

    if (this.slideWaButton) {
      const boxElem = this.getBoxElem()
      boxElem.classList.add(config.slideCls)
    }

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
