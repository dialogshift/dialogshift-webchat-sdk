import {
  ChatButtonWidget,
  ChatboxWidget,
  WrapperWidget,
  ContentWrapperWidget,
  IframeWidget,
  TeaserWidget,
  UnreadWidget,
  ActionButtonGroupWidget,
} from '../widgets/index'
import { EventEmitter } from './event-emitter'
import { MixedObject } from '../types'
import { config } from '../config/config'
import { WebchatService } from '../services'
import { AppOptions } from './app'

export class WidgetManager {
  private readonly broadcast: EventEmitter
  private readonly webchatService: WebchatService

  private chatButtonWidget: ChatButtonWidget
  private chatboxWidget: ChatboxWidget
  private wrapperWidget: WrapperWidget
  private contentWrapperWidget: ContentWrapperWidget
  private iframeWidget: IframeWidget
  private teaserWidget: TeaserWidget
  private unreadWidget: UnreadWidget
  private actionButtonGroupWidget: ActionButtonGroupWidget

  constructor(broadcast: EventEmitter, webchatService: WebchatService) {
    this.broadcast = broadcast
    this.webchatService = webchatService
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
    const { buttonText, defaultLocale } = chatConfig

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
      // isAnimated: false,
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
          callback: () => this.broadcast.fire('button.show.before'),
        },
        {
          type: 'show',
          callback: () => this.broadcast.fire('button.show'),
        },
        {
          type: 'before:hide',
          callback: () => this.broadcast.fire('button.hide.before'),
        },
        {
          type: 'hide',
          callback: () => this.broadcast.fire('button.hide'),
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
    const { teaserText, defaultLocale } = chatConfig

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
      // isAnimated: true,
      events: [
        {
          type: 'before:show',
          callback: () => {
            this.broadcast.fire('teaser.show.before')

            if (this.actionButtonGroupWidget) {
              this.actionButtonGroupWidget.show()
            }

            this.wrapperWidget.addCls(config.wrapperTeaserIsOpenCls)
          },
        },
        {
          type: 'show',
          callback: () => this.broadcast.fire('teaser.show'),
        },
        {
          type: 'before:hide',
          callback: () => {
            this.wrapperWidget.removeCls(config.wrapperTeaserIsOpenCls)

            if (this.actionButtonGroupWidget) {
              this.actionButtonGroupWidget.hide()
            }

            this.broadcast.fire('teaser.hide.before')
          },
        },
        {
          type: 'hide',
          callback: () => this.broadcast.fire('teaser.hide'),
        },
        {
          type: 'click',
          callback: () => this.chatboxWidget.show(),
        },
      ],
    })
  }

  renderUnreadWidget(options: AppOptions) {
    this.unreadWidget = new UnreadWidget({
      visible: options.unreadCounter > 0 ? true : false,
      renderTo: this.wrapperWidget.getBoxElem(),
      unreadCounter: options.unreadCounter,
      // isAnimated: true,
    })
  }

  renderChatboxWidget(options: AppOptions, beforeShowCallback: () => void) {
    this.chatboxWidget = new ChatboxWidget({
      visible: options.isChatboxVisible,
      events: [
        {
          type: 'before:show',
          callback: () => {
            this.broadcast.fire('chatbox.show.before')

            this.teaserWidget.hide()

            if (this.unreadWidget) {
              this.unreadWidget.reset()
            }

            if (this.chatButtonWidget) {
              this.chatButtonWidget.setState('active')
            }

            if (this.webchatService) {
              this.webchatService.setMinimized(false)
            }

            beforeShowCallback()
          },
        },
        {
          type: 'show',
          callback: () => this.broadcast.fire('chatbox.show'),
        },
        {
          type: 'before:hide',
          callback: () => {
            this.broadcast.fire('chatbox.hide.before')

            if (this.teaserWidget.isVisible()) {
              this.teaserWidget.show()
            }

            this.chatButtonWidget.setState('default')

            if (this.webchatService) {
              this.webchatService.setMinimized(true)
            }
          },
        },
        {
          type: 'hide',
          callback: () => {
            this.broadcast.fire('chatbox.hide')
          },
        },
      ],
    })

    this.chatboxWidget.render(this.wrapperWidget.getBoxElem())

    this.broadcast.on('ready', () => {
      this.chatboxWidget.setState('ready')
    })
  }

  renderActionButtonGroupWidget(options: AppOptions, chatConfig: MixedObject) {
    const { actionButtons } = chatConfig

    this.actionButtonGroupWidget = new ActionButtonGroupWidget({
      renderTo: this.contentWrapperWidget.getBoxElem(),
      visible:
        actionButtons &&
        actionButtons.length > 0 &&
        this.teaserWidget.isVisible(),
    })

    if (actionButtons && actionButtons.length > 0) {
      actionButtons.forEach((item: MixedObject) => {
        this.actionButtonGroupWidget.addButton({
          ...item,
          locale: options.locale,
          defaultLocale: chatConfig.defaultLocale,
          app: this,
        })
      })
    }
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
}
