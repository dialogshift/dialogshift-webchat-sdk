import { EventHandler } from './event-emitter'
import { App, ChatPosition, InitialElement, AppTheme, Visitor, ChatConfig } from './app'

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

    showActionButtons() {
      instance.getActionButtonGroupWidget().show()
    },

    hideActionButtons() {
      instance.getActionButtonGroupWidget().hide()
    },

    getContext(key: string): Promise<any> {
      return instance.getContext(key)
    },

    setContext(key: string, value: any): Promise<any> {
      return instance.setContext(key, value)
    },

    getVisitor(): Visitor {
      return instance.getVisitor()
    },

    getConfig(): ChatConfig {
      return instance.getConfig()
    },

    setUnreadCounter(amount: number) {
      instance.getUnreadWidget().setCounter(amount)
    },

    increaseUnreadCounter(amount: number) {
      instance.getUnreadWidget().increase(amount)
    },

    triggerElement(options: {
      successor: string,
      showChatbox?: boolean,
      suppressInitialElement?: boolean,
    }) {
      instance.triggerElement(options)
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

    isReady(): boolean {
      return instance.isReady()
    },
  }
}
