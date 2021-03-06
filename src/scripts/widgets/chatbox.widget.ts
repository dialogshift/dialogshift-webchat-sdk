import { BaseWidgetOptions, BaseWidget } from '../core/base-widget'
import { config } from '../config/config'

interface ChatboxWidgetOptions extends BaseWidgetOptions {
  hasExtendedWidth: boolean
}

type ChatboxWidgetState = 'loading' | 'ready'

export class ChatboxWidget extends BaseWidget {
  private hasExtendedWidth = false

  constructor(options: ChatboxWidgetOptions) {
    super(options)

    this.setState('loading')

    if (options.hasExtendedWidth) {
      this.hasExtendedWidth = true
      this.getBoxElem().classList.add(config.chatHasExtendedWidth)
    }

    this.on('before:show', () => document.body.classList.add(config.chatIsOpen))
    this.on('before:hide', () =>
      document.body.classList.remove(config.chatIsOpen),
    )
  }

  protected showNode() {
    const boxElem = this.getBoxElem()

    boxElem.style.zIndex = '30'
    boxElem.style.visibility = 'visible'

    setTimeout(() => {
      boxElem.style.opacity = '1'
    })
  }

  protected hideNode() {
    const boxElem = this.getBoxElem()
    boxElem.style.opacity = '0'

    setTimeout(() => {
      boxElem.style.zIndex = '-1'
      boxElem.style.visibility = 'hidden'
    })
  }

  getBaseCls(): string {
    return config.chatCls
  }

  setState(state: ChatboxWidgetState) {
    if (state === 'loading') {
      this.getBoxElem().classList.add(config.chatLoadingCls)
    }

    if (state === 'ready') {
      this.getBoxElem().classList.remove(config.chatLoadingCls)
    }
  }
}
