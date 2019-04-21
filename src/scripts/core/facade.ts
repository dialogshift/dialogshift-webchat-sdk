import { EventHandler } from './event-emitter'
import { App, ChatPosition } from './app'

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
      instance.getButtonWidget().setText(text)
    },

    showTeaser() {
      instance.getTeaserWidget().show()
    },

    hideTeaser() {
      instance.getTeaserWidget().hide()
    },

    setTeaserText(text: string) {
      instance.getTeaserWidget().setText(text)
    },

    setPosition(position: ChatPosition) {
      instance.getWrapperWidget().setPosition(position)
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
  }
}
