import { BaseWidgetOptions, BaseWidget } from '../core/base-widget'
import { config } from '../config/config'

interface ChatboxWidgetOptions extends BaseWidgetOptions {}

type ChatboxWidgetState = 'loading' | 'ready'

export class ChatboxWidget extends BaseWidget {
  constructor(options: ChatboxWidgetOptions) {
    super(options)

    this.setState('loading')

    this.on('before:show', () => document.body.classList.add(config.chatIsOpen))
    this.on('before:hide', () =>
      document.body.classList.remove(config.chatIsOpen),
    )
  }

  getBaseCls() {
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
