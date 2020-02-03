import { EventHandler } from './event-emitter'
import { App, ChatPosition, InitialElement, AppTheme } from './app'

export const createFacade = (instance: App) => {
  return {
    on(type: string, handler: EventHandler) {
      instance.getBroadcast().on(type, handler)
    },

    once(type: string, handler: EventHandler) {
      instance.getBroadcast().once(type, handler)
    },

    off(type?: string, handler?: EventHandler) {
      instance.getBroadcast().off(type, handler)
    },

    offAll() {
      instance.getBroadcast().offAll()
    },

    showChatbox() {
      instance.getChatboxWidget().show()
    },

    hideChatbox() {
      instance.getChatboxWidget().hide()
    },

    showButton() {
      instance.getButtonWidget().show()
    },

    hideButton() {
      instance.getButtonWidget().hide()
    },

    setButtonText(text: string) {
      instance.getButtonWidget().setContent(text)
    },

    showTeaser() {
      instance.getTeaserWidget().show()
    },

    hideTeaser() {
      instance.getTeaserWidget().hide()
    },

    setTeaserText(text: string) {
      instance.getTeaserWidget().setContent(text)
    },

    setPosition(position: ChatPosition) {
      instance.getWrapperWidget().setPosition(position)
    },

    setTheme(theme: AppTheme) {
      instance.getWrapperWidget().setTheme(theme)
    },

    getContext(key: string): Promise<any> {
      return instance.getContext(key)
    },

    setContext(key: string, value: any): Promise<any> {
      return instance.setContext(key, value)
    },

    getVisitor() {
      return instance.getVisitor()
    },

    getConfig() {
      return instance.getConfig()
    },

    setUnreadCounter(amount: number) {
      instance.getUnreadWidget().setCounter(amount)
    },

    increaseUnreadCounter(amount: number) {
      instance.getUnreadWidget().increase(amount)
    },

    triggerElement(options: {
      successor: string
      showChatbox?: boolean
      suppressInitialElement?: boolean,
    }) {
      const config = {
        showChatbox: true,
        suppressInitialElement: true,
        ...options,
      }

      if (!this.isReady()) {
        this.once('ready', () => {
          setTimeout(() => {
            instance.triggerElement({
              successor: options.successor,
            })
          },         250)
        })

        if (config.suppressInitialElement) {
          this.setInitialElement({
            suppress: true,
          })
        }

        if (config.showChatbox) {
          this.showChatbox()
        } else {
          instance.loadChat()
        }
      }

      if (this.isReady()) {
        if (!this.isChatboxVisible() && config.showChatbox) {
          this.showChatbox()
        }

        instance.triggerElement({
          successor: options.successor,
        })
      }
    },

    setInitialElement(options: InitialElement) {
      instance.setInitialElement(options)
    },

    getInitialElement(): InitialElement {
      return instance.getInitialElement()
    },

    isChatboxVisible(): boolean {
      const chatbox = instance.getChatboxWidget()
      return chatbox ? chatbox.isVisible() : false
    },

    destroy() {
      instance.destroy()
    },

    isDestroyed() {
      return instance.isDestroyed()
    },

    isReady() {
      return instance.isReady()
    },
  }
}
