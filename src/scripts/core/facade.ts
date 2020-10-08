import { EventHandler } from './event-emitter'
import { App, ChatPosition, InitialElement, AppTheme } from './app'
import { MixedObject } from '../types'

const c2o = [
  'pro110d',
  'pro1130',
  'pro112b',
  'pro1120',
  'pro1190',
  'pro118b',
  'pro1185',
  'pro11a1',
]

export const createFacade = (instance: App) => {
  return {
    on(type: string, handler: EventHandler) {
      let typeToHandle = type

      if (c2o.indexOf(instance.options.id) !== -1 && type === 'ready') {
        typeToHandle = 'init'
      }

      instance.getBroadcast().on(typeToHandle, handler)
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
      instance.getWidgetManager().getChatboxWidget().show()
    },

    hideChatbox() {
      instance.getWidgetManager().getChatboxWidget().hide()
    },

    showButton() {
      instance.getWidgetManager().getChatButtonWidget().show()
    },

    hideButton() {
      instance.getWidgetManager().getChatButtonWidget().hide()
    },

    setButtonText(text: string) {
      instance.getWidgetManager().getChatButtonWidget().setContent(text)
    },

    showTeaser() {
      instance.getWidgetManager().getTeaserWidget().show()
    },

    hideTeaser() {
      instance.getWidgetManager().getTeaserWidget().hide()
    },

    setTeaserText(text: string) {
      instance.getWidgetManager().getTeaserWidget().setContent(text)
    },

    setPosition(position: ChatPosition) {
      instance.getWidgetManager().getWrapperWidget().setPosition(position)
    },

    setTheme(theme: AppTheme) {
      instance.getWidgetManager().getWrapperWidget().setTheme(theme)
    },

    showActionButtons() {
      instance.getWidgetManager().getActionButtonGroupWidget().show()
    },

    hideActionButtons() {
      instance.getWidgetManager().getActionButtonGroupWidget().hide()
    },

    setActionButtons(buttons: MixedObject[]) {
      instance.setActionButtons(buttons)
    },

    getContext(key: string): Promise<any> {
      return instance.getContext(key)
    },

    setContext(key: string, value: any): Promise<any> {
      return instance.setContext(key, value)
    },

    getConfig(): MixedObject {
      return instance.getConfig()
    },

    setUnreadCounter(amount: number) {
      instance.getWidgetManager().getUnreadWidget().setCounter(amount)
    },

    increaseUnreadCounter(amount: number) {
      instance.getWidgetManager().getUnreadWidget().increase(amount)
    },

    triggerElement(options: {
      successor: string
      showChatbox?: boolean
      suppressInitialElement?: boolean
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
      const chatbox = instance.getWidgetManager().getChatboxWidget()
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
