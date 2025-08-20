import { BaseWidgetOptions, BaseWidget } from '../core/base-widget'
import { config } from '../config/config'
import { iconSvg } from '../consts'

interface ChatButtonWidgetOptions extends BaseWidgetOptions {
  iconUrl?: string
}

export class ChatButtonWidget extends BaseWidget {
  private isPressed = false
  protected iconUrl: string | undefined = undefined

  constructor(options: ChatButtonWidgetOptions) {
    super(options)
  }

  private bindEvents() {
    this.getBoxElem().addEventListener('click', () => {
      this.toggle()
    })

    this.getBoxElem().addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        this.toggle()
      }
    })
  }

  getBaseCls(): string {
    return config.buttonCls
  }

  render() {
    const boxElem = this.getBoxElem()

    if (this.iconUrl === undefined) {
      const iconContainer = document.createElement('div')
      iconContainer.classList.add(config.buttonIconContainerCls)
      iconContainer.tabIndex = 0
      iconContainer.innerHTML = iconSvg
      boxElem.appendChild(iconContainer)

      boxElem.classList.add(config.buttonLogoCls)
    } else {
      boxElem.style.backgroundColor = ''
      boxElem.style.background = `url(${this.iconUrl})`
    }

    this.bindEvents()

    super.render()
  }

  toggle(state?: boolean, suppressEvent = false, timeout = 100): void {
    const isPressed = state === undefined ? !this.isPressed : state

    if (isPressed === this.isPressed) {
      return
    }

    this.isPressed = isPressed

    if (isPressed) {
      this.getBoxElem().classList.add(config.buttonHiddenCls)
    } else {
      setTimeout(() => {
        this.getBoxElem().classList.remove(config.buttonHiddenCls)
      }, timeout)
    }

    if (!suppressEvent) {
      this.fire('toggle', {
        isPressed,
      })
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
