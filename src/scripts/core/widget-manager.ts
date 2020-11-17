import {
  ChatButtonWidget,
  ChatboxWidget,
  WrapperWidget,
  ContentWrapperWidget,
  IframeWidget,
  TeaserWidget,
  UnreadWidget,
  ActionButtonGroupWidget,
  WhatsappButtonWidget,
  WhatsappWindowWidget,
} from '../widgets/index'
import { EventEmitter } from './event-emitter'
import { MixedObject } from '../types'
import { config } from '../config/config'
import { WebchatService } from '../services'
import { AppOptions, App } from './app'

export class WidgetManager {
  private readonly app: App
  private chatButtonWidget: ChatButtonWidget
  private chatboxWidget: ChatboxWidget
  private wrapperWidget: WrapperWidget
  private contentWrapperWidget: ContentWrapperWidget
  private iframeWidget: IframeWidget
  private teaserWidget: TeaserWidget
  private unreadWidget: UnreadWidget
  private actionButtonGroupWidget: ActionButtonGroupWidget
  private whatsappButtonWidget: WhatsappButtonWidget
  private whatsappWindowWidget: WhatsappWindowWidget

  constructor(app: App) {
    this.app = app
  }

  private getWebchatService(): WebchatService {
    return this.app.getWebchatService()
  }

  private getBroadcast(): EventEmitter {
    return this.app.getBroadcast()
  }

  private isAppReady(): boolean {
    return this.app.isReady()
  }

  renderWrapper(options: AppOptions) {
    this.wrapperWidget = new WrapperWidget({
      renderTo: document.body,
      position: options.position,
      theme: options.theme,
      direction: options.direction,
    })

    if (!options.renderButton) {
      this.wrapperWidget.addCls(config.wrapperNoButtonCls)
    }
  }

  renderContentWrapper() {
    this.contentWrapperWidget = new ContentWrapperWidget({
      renderTo: this.wrapperWidget.getBoxElem(),
    })
  }

  renderChatButton(options: AppOptions, chatConfig: MixedObject) {
    const { locale } = options
    const { buttonText, defaultLocale, effects } = chatConfig

    let content = ''

    if (buttonText) {
      if (buttonText[locale]) {
        content = buttonText[locale]
      } else if (defaultLocale && buttonText[defaultLocale]) {
        content = buttonText[defaultLocale]
      }
    }

    this.chatButtonWidget = new ChatButtonWidget({
      content,
      renderTo: this.wrapperWidget.getBoxElem(),
      visible: options.isButtonVisible,
      effects: effects?.chatButton,
      events: [
        {
          type: 'toggle',
          callback: (event: MixedObject) => {
            event.data.isPressed
              ? this.chatboxWidget.show()
              : this.chatboxWidget.hide()
          },
        },
        {
          type: 'before:show',
          callback: () => this.getBroadcast().fire('button.show.before'),
        },
        {
          type: 'show',
          callback: () => this.getBroadcast().fire('button.show'),
        },
        {
          type: 'before:hide',
          callback: () => this.getBroadcast().fire('button.hide.before'),
        },
        {
          type: 'hide',
          callback: () => this.getBroadcast().fire('button.hide'),
        },
      ],
    })
  }

  renderIframeWidget(options: AppOptions, afterRender: () => void) {
    this.iframeWidget = new IframeWidget({
      host: (config as MixedObject).env.iframeHost,
      id: options.id,
      initialElement: options.initialElement,
      locale: options.locale,
      events: [
        {
          type: 'render',
          callback: () => {
            afterRender()
          },
        },
      ],
    })
  }

  renderTeaserWidget(
    options: AppOptions,
    chatConfig: MixedObject,
    isTeaserVisible: boolean,
  ) {
    const { locale } = options
    const { teaserText, defaultLocale, effects } = chatConfig

    let content = 'Can I help you?'

    if (teaserText) {
      if (teaserText[locale]) {
        content = teaserText[locale]
      } else if (defaultLocale && teaserText[defaultLocale]) {
        content = teaserText[defaultLocale]
      }
    }

    this.teaserWidget = new TeaserWidget({
      content,
      showTeaserOnce: chatConfig.showTeaserOnce,
      hideTeaserAfterTimes: chatConfig.hideTeaserAfterTimes,
      renderTo: this.contentWrapperWidget.getBoxElem(),
      visible: isTeaserVisible,
      effects: effects?.teaser,
      events: [
        {
          type: 'before:show',
          callback: () => {
            this.getBroadcast().fire('teaser.show.before')

            if (this.actionButtonGroupWidget) {
              this.actionButtonGroupWidget.show()
            }

            this.wrapperWidget.addCls(config.wrapperTeaserIsOpenCls)
          },
        },
        {
          type: 'show',
          callback: () => this.getBroadcast().fire('teaser.show'),
        },
        {
          type: 'before:hide',
          callback: () => {
            this.wrapperWidget.removeCls(config.wrapperTeaserIsOpenCls)

            if (this.actionButtonGroupWidget) {
              this.actionButtonGroupWidget.hide()
            }

            this.getBroadcast().fire('teaser.hide.before')
          },
        },
        {
          type: 'hide',
          callback: () => this.getBroadcast().fire('teaser.hide'),
        },
        {
          type: 'click',
          callback: () => this.chatboxWidget.show(),
        },
      ],
    })
  }

  renderUnreadWidget(options: AppOptions, chatConfig: MixedObject) {
    const { effects } = chatConfig

    this.unreadWidget = new UnreadWidget({
      visible: options.unreadCounter > 0 ? true : false,
      renderTo: this.wrapperWidget.getBoxElem(),
      unreadCounter: options.unreadCounter,
      effects: effects?.unreadCounter,
    })
  }

  renderChatboxWidget(options: AppOptions, beforeShowCallback: () => void) {
    this.chatboxWidget = new ChatboxWidget({
      visible: options.isChatboxVisible,
      hasExtendedWidth: options.extendedWidth,
      events: [
        {
          type: 'before:show',
          callback: () => {
            this.getBroadcast().fire('chatbox.show.before')

            this.teaserWidget.hide()

            if (this.unreadWidget) {
              this.unreadWidget.reset()
            }

            if (this.chatButtonWidget) {
              this.chatButtonWidget.toggle(true)
            }

            if (this.getWebchatService()) {
              this.getWebchatService().setMinimized(false)
            }

            beforeShowCallback()
          },
        },
        {
          type: 'show',
          callback: () => this.getBroadcast().fire('chatbox.show'),
        },
        {
          type: 'before:hide',
          callback: () => {
            this.getBroadcast().fire('chatbox.hide.before')

            if (this.teaserWidget.isVisible()) {
              this.teaserWidget.show()
            }

            this.chatButtonWidget.toggle(false)

            if (this.getWebchatService()) {
              this.getWebchatService().setMinimized(true)
            }
          },
        },
        {
          type: 'hide',
          callback: () => {
            this.getBroadcast().fire('chatbox.hide')
          },
        },
      ],
    })

    this.chatboxWidget.render(this.wrapperWidget.getBoxElem())

    this.getBroadcast().on('ready', () => {
      this.chatboxWidget.setState('ready')
    })
  }

  renderActionButtonGroupWidget(
    app: App,
    options: AppOptions,
    chatConfig: MixedObject,
  ) {
    const { actionButtons, effects } = chatConfig

    this.actionButtonGroupWidget = new ActionButtonGroupWidget({
      renderTo: this.contentWrapperWidget.getBoxElem(),
      effects: effects?.actionButtons,
      visible:
        actionButtons &&
        actionButtons.length > 0 &&
        this.teaserWidget.isVisible(),
    })

    if (actionButtons && actionButtons.length > 0) {
      actionButtons.forEach((item: MixedObject) => {
        this.actionButtonGroupWidget.addButton({
          ...item,
          app,
          locale: options.locale,
          defaultLocale: chatConfig.defaultLocale,
        })
      })
    }
  }

  renderWhatsappButtonWidget(chatConfig: MixedObject) {
    const { effects } = chatConfig

    this.whatsappButtonWidget = new WhatsappButtonWidget({
      renderTo: this.wrapperWidget.getBoxElem(),
      effects: effects?.whatsappButton,
      events: [
        {
          type: 'toggle',
          callback: (event: MixedObject) => {
            if (event.data.isPressed) {
              if (!this.isAppReady()) {
                this.getBroadcast().once('ready', () => {
                  this.whatsappWindowWidget.show()
                })
              } else {
                this.whatsappWindowWidget.show()
              }

              this.chatButtonWidget.toggle(true)
              this.wrapperWidget.addCls('ds-whatsapp--opened')
            } else {
              this.whatsappWindowWidget.hide()
              this.wrapperWidget.removeCls('ds-whatsapp--opened')
            }
          },
        },
      ],
    })

    this.chatboxWidget.on('before:hide', () => {
      this.whatsappButtonWidget.toggle(false)
    })
  }

  renderWhatsappWindowWidget(options: AppOptions) {
    this.whatsappWindowWidget = new WhatsappWindowWidget({
      renderTo: this.chatboxWidget.getBoxElem(),
      visible: false,
      clientId: options.id,
      locale: options.locale,
      events: [
        {
          type: 'before:hide',
          callback: () => {
            this.iframeWidget.show()
            this.whatsappButtonWidget.toggle(false)
          },
        },
        {
          type: 'before:show',
          callback: () => {
            this.iframeWidget.hide()
          },
        },
      ],
    })

    this.chatboxWidget.on('before:hide', () => {
      this.whatsappWindowWidget.hide()
    })
  }

  getChatButtonWidget(): ChatButtonWidget {
    return this.chatButtonWidget
  }

  getWrapperWidget(): WrapperWidget {
    return this.wrapperWidget
  }

  getIframeWidget(): IframeWidget {
    return this.iframeWidget
  }

  getChatboxWidget(): ChatboxWidget {
    return this.chatboxWidget
  }

  getTeaserWidget(): TeaserWidget {
    return this.teaserWidget
  }

  getUnreadWidget(): UnreadWidget {
    return this.unreadWidget
  }

  getActionButtonGroupWidget(): ActionButtonGroupWidget {
    return this.actionButtonGroupWidget
  }

  getWhatsappButtonWidget(): WhatsappButtonWidget {
    return this.whatsappButtonWidget
  }

  getWhatsappWindowWidget(): WhatsappWindowWidget {
    return this.whatsappWindowWidget
  }

  destroy() {
    this.unreadWidget.destroy()
    this.teaserWidget.destroy()
    this.chatButtonWidget.destroy()
    this.iframeWidget.destroy()
    this.chatboxWidget.destroy()
    this.wrapperWidget.destroy()
    this.actionButtonGroupWidget.destroy()

    if (this.whatsappButtonWidget) {
      this.whatsappButtonWidget.destroy()
    }

    if (this.whatsappWindowWidget) {
      this.whatsappWindowWidget.destroy()
    }
  }
}
