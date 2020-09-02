import { config } from '../config/config'
import { EventEmitter, Event } from './event-emitter'
import {
  WrapperWidget,
  ButtonWidget,
  ChatboxWidget,
  IframeWidget,
  TeaserWidget,
  UnreadWidget,
} from '../widgets/index'
import {
  ApiService,
  WebchatService,
  CookieService,
  UserService,
  AnalyticsService,
} from '../services'
import {
  parseUrlParam,
  isExternalUrl,
  injectCss,
  mergeDeep,
  removeURLParameters,
} from './utils'
import { ActionButtonGroupWidget } from '../widgets/action-button-group-widget'
import { MixedObject } from '../types'

export enum ChatPosition {
  left = 'left',
  right = 'right',
}

export enum AppTheme {
  round = 'round',
  tile = 'tile',
}

export interface InitialElement {
  successor?: string | null
  suppress?: boolean
}

export interface AppOptions {
  id: string
  locale?: string
  position?: ChatPosition
  theme?: AppTheme
  isChatboxVisible?: boolean
  isButtonVisible?: boolean
  showTeaserOnce?: boolean
  renderButton?: boolean
  showFooter?: boolean
  initialElement?: InitialElement
  unreadCounter?: number
}

const appOptionsDefault = {
  locale: 'en',
  theme: AppTheme.round,
  position: ChatPosition.right,
  isChatboxVisible: false,
  isButtonVisible: true,
  showTeaserOnce: false,
  renderButton: true,
  showFooter: true,
  initialElement: {
    successor: null,
    suppress: false,
  },
  unreadCounter: 0,
}

export enum ActionEventType {
  action = 'action',
  message = 'message',
  command = 'command',
}

export enum ActionEventName {
  userReady = 'user.ready',
  tabOpen = 'tab.open',
  setTeaserText = 'set.teaser.text',
  showChatbox = 'show.chatbox',
  hideChatbox = 'hide.chatbox',
}

export interface ActionEvent {
  type: ActionEventType
  name: string
  payload: MixedObject
}

export class App {
  private options: AppOptions
  private wrapperWidget: WrapperWidget
  private buttonWidget: ButtonWidget
  private chatboxWidget: ChatboxWidget
  private iframeWidget: IframeWidget
  private teaserWidget: TeaserWidget
  private unreadWidget: UnreadWidget
  private actionButtonGroupWidget: ActionButtonGroupWidget
  private broadcast: EventEmitter
  private webchatService: WebchatService
  private chatConfig: MixedObject
  private destroyed = false
  private ready = false
  private csrfToken: string
  private isTeaserVisible = false

  constructor(options: AppOptions) {
    if (!options) {
      throw Error('Please provide Dialogshift chat configuration')
    }

    if (!options.id) {
      throw Error('Dialogshift app id is undefined.')
    }

    this.options = mergeDeep(appOptionsDefault, options) as AppOptions
    this.broadcast = new EventEmitter()

    this.init()
  }

  private init() {
    if (parseUrlParam(window.location.href, 'ctrl') === 'forcenew') {
      UserService.deleteUser()
      AnalyticsService.deleteToken()
      removeURLParameters(['ctrl'])
    }

    const openUrlParam = parseUrlParam(window.location.href, 'dschat')

    if (openUrlParam === 'open') {
      this.options.isChatboxVisible = true
    }

    this.loadConfig().then(() => {
      if (this.chatConfig.showWebsiteChat === false) {
        return
      }

      if (this.chatConfig.enableCSRFProtection) {
        AnalyticsService.touchToken(this.options.id).then((token: string) => {
          this.csrfToken = token
          this.afterInit()
        })
      } else {
        this.afterInit()
      }
    })
  }

  private afterInit() {
    this.render()
    this.afterRender()
    this.bindEvents()
    setTimeout(() => {
      this.broadcast.fire('init')
    }, 20)
  }

  private initWebchatService() {
    this.webchatService = new WebchatService({
      targetWindow: this.iframeWidget.getBoxElem(),
    })
  }

  private renderContentWrapper(): HTMLElement {
    const node = document.createElement('div')
    node.classList.add('ds-content-wrapper')

    this.wrapperWidget.getBoxElem().appendChild(node)

    return node
  }

  private render() {
    this.renderWrapperWidget()
    const contentWrapperNode = this.renderContentWrapper()

    if (this.options.renderButton) {
      this.renderButtonWidget()
    }

    this.createIframeWidget()
    this.renderTeaserWidget(contentWrapperNode)
    this.renderActionButtons(contentWrapperNode)
    this.renderChatboxWidget()
    this.renderUnreadWidget()
  }

  private afterRender() {
    const { showTeaserAfter, hideTeaserAfter } = this.chatConfig

    if (showTeaserAfter) {
      setTimeout(() => {
        if (!this.teaserWidget.isVisible() && !this.chatboxWidget.isVisible()) {
          this.teaserWidget.show()
        }
      }, showTeaserAfter * 1000)
    }

    if (hideTeaserAfter) {
      setTimeout(() => {
        this.teaserWidget.hide()
      }, hideTeaserAfter * 1000)
    }

    if (CookieService.get('keep-chat-open') === 'true') {
      this.setInitialElement({
        suppress: true,
      })
      this.loadChat()

      this.getBroadcast().once('ready', () => {
        setTimeout(() => {
          this.webchatService.setMinimized(true)
        }, 250)
      })
    }
  }

  private bindEvents() {
    window.addEventListener('message', (event: MixedObject) => {
      if (event.origin === (config as MixedObject).env.iframeHost) {
        const message = event.data as ActionEvent

        if (message.type === ActionEventType.message) {
          this.broadcast.fire(message.name, message.payload)
        }

        if (message.type === ActionEventType.command) {
          this.broadcast.fire(message.name, message.payload)
        }

        if (message.type === ActionEventType.action) {
          this.proceedActionEvent(message)
        }
      }
    })

    this.broadcast.on('message.receive', (event: Event) => {
      if (!this.chatboxWidget.isVisible() && !event.data.fromHistory) {
        this.unreadWidget.increase(1)
      }
    })

    this.broadcast.on('command.receive', (event: any) => {
      const commandModel = event.data

      if (commandModel.commandType === 'livechat') {
        if (
          commandModel.action === 'start' &&
          this.chatConfig.keepChatOpenDuringLivechat
        ) {
          CookieService.set('keep-chat-open', 'true')
        }

        if (commandModel.action === 'end') {
          CookieService.set('keep-chat-open', 'false')
        }
      }
    })
  }

  private proceedActionEvent(message: MixedObject) {
    if (message.name === ActionEventName.tabOpen) {
      let url = message.payload.targetUrl

      if (message.payload.urlType === 'openSameTab') {
        if (!isExternalUrl(url)) {
          url += `${url.split('?')[1] ? '&' : '?'}dschat=open`
        }
        window.open(url, '_self')
      }

      if (message.payload.urlType === 'openNewTab') {
        window.open(url, '_blank')
      }
    }

    if (message.name === ActionEventName.setTeaserText) {
      this.getTeaserWidget().setContent(message.payload.text)
      this.getTeaserWidget().show({
        force: true,
      })
    }

    if (message.name === ActionEventName.showChatbox) {
      this.getChatboxWidget().show()
    }

    if (message.name === ActionEventName.hideChatbox) {
      this.getChatboxWidget().hide()
    }
  }

  private renderChatboxWidget() {
    this.chatboxWidget = new ChatboxWidget({
      visible: this.options.isChatboxVisible,
      events: [
        {
          type: 'before:show',
          callback: () => {
            this.broadcast.fire('chatbox.show.before')

            this.teaserWidget.hide()

            if (this.unreadWidget) {
              this.unreadWidget.reset()
            }

            if (this.buttonWidget) {
              this.buttonWidget.setState('active')
            }

            if (this.webchatService) {
              this.webchatService.setMinimized(false)
            }

            this.loadChat()
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

            if (this.isTeaserVisible) {
              this.teaserWidget.show()
            }

            this.buttonWidget.setState('default')

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
      this.ready = true
      this.chatboxWidget.setState('ready')
    })
  }

  private renderButtonWidget() {
    const { locale } = this.options
    const { buttonText, defaultLocale } = this.chatConfig

    let content = ''

    if (buttonText) {
      if (buttonText[locale]) {
        content = buttonText[locale]
      } else if (defaultLocale && buttonText[defaultLocale]) {
        content = buttonText[defaultLocale]
      }
    }

    this.buttonWidget = new ButtonWidget({
      content,
      renderTo: this.wrapperWidget.getBoxElem(),
      visible: this.options.isButtonVisible,
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

  private renderWrapperWidget() {
    this.wrapperWidget = new WrapperWidget({
      renderTo: document.body,
      position: this.options.position,
      theme: this.options.theme,
      direction: this.options.locale === 'ar' ? 'rtl' : 'ltr',
    })

    if (!this.options.renderButton) {
      this.wrapperWidget.addCls(config.wrapperNoButtonCls)
    }
  }

  private createIframeWidget() {
    this.iframeWidget = new IframeWidget({
      host: (config as MixedObject).env.iframeHost,
      id: this.options.id,
      initialElement: this.options.initialElement,
      locale: this.options.locale,
      events: [
        {
          type: 'render',
          callback: () => this.initWebchatService(),
        },
      ],
    })
  }

  private renderTeaserWidget(parentNode: HTMLElement) {
    const { locale } = this.options
    const { teaserText, defaultLocale } = this.chatConfig

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
      showTeaserOnce: this.chatConfig.showTeaserOnce,
      hideTeaserAfterTimes: this.chatConfig.hideTeaserAfterTimes,
      renderTo: parentNode,
      visible: this.isTeaserVisible,
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

  private renderUnreadWidget() {
    this.unreadWidget = new UnreadWidget({
      visible: this.options.unreadCounter > 0 ? true : false,
      renderTo: this.wrapperWidget.getBoxElem(),
      unreadCounter: this.options.unreadCounter,
    })
  }

  private renderActionButtons(parentNode: HTMLElement) {
    const { actionButtons } = this.chatConfig

    this.actionButtonGroupWidget = new ActionButtonGroupWidget({
      renderTo: parentNode,
      visible:
        actionButtons && actionButtons.length > 0 && this.isTeaserVisible,
    })

    if (actionButtons && actionButtons.length > 0) {
      actionButtons.forEach((item: MixedObject) => {
        this.actionButtonGroupWidget.addButton({
          ...item,
          locale: this.options.locale,
          defaultLocale: this.chatConfig.defaultLocale,
          app: this,
        })
      })
    }
  }

  private loadConfig(): Promise<MixedObject> {
    return ApiService.getConfig(
      this.options.id,
      UserService.getCustomerId(),
    ).then((data: MixedObject) => {
      this.chatConfig = data

      if (data.websiteElementCss) {
        injectCss(data.websiteElementCss)
      }

      if (this.chatConfig.defaultLg) {
        this.chatConfig.defaultLocale = this.chatConfig.defaultLg
        delete this.chatConfig.defaultLg
      }

      this.applyConfig()

      return this.chatConfig
    })
  }

  private applyConfig() {
    const {
      setUnreadCounter,
      showTeaserAfter,
      hideTeaserAfter,
      theme,
      noCookieModeSdk,
      forgetCustomerAfterHours,
    } = this.chatConfig

    if (setUnreadCounter) {
      this.options.unreadCounter = setUnreadCounter
    }

    if (showTeaserAfter === 0) {
      this.isTeaserVisible = true
    }

    if (hideTeaserAfter === 0) {
      this.isTeaserVisible = false
    }

    if (theme && theme in AppTheme) {
      this.options.theme = theme
    }

    if (noCookieModeSdk === true) {
      CookieService.noCookieMode = true
    }

    if (forgetCustomerAfterHours) {
      UserService.updateCookieLifetime(forgetCustomerAfterHours)
    }
  }

  getBroadcast(): EventEmitter {
    return this.broadcast
  }

  getWrapperWidget(): WrapperWidget {
    return this.wrapperWidget
  }

  getChatboxWidget(): ChatboxWidget {
    return this.chatboxWidget
  }

  getButtonWidget(): ButtonWidget {
    return this.buttonWidget
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

  getContext(key: string): Promise<any> {
    return ApiService.getContext(UserService.getCustomerId(), key)
  }

  setContext(key: string, value: any): Promise<any> {
    return ApiService.setContext(UserService.getCustomerId(), key, value)
  }

  getConfig(): MixedObject {
    return this.chatConfig
  }

  setInitialElement(initialElement: InitialElement) {
    const mergedInitialElement = mergeDeep(
      this.options.initialElement,
      initialElement,
    )

    this.options.initialElement = mergedInitialElement

    if (this.iframeWidget) {
      this.iframeWidget.setInitialElement(mergedInitialElement)
    }
  }

  getInitialElement(): InitialElement {
    return this.options.initialElement
  }

  triggerElement(options: {
    successor: string
    teaserButton?: boolean
    showChatbox?: boolean
    suppressInitialElement?: boolean
  }) {
    const config = {
      showChatbox: true,
      suppressInitialElement: true,
      ...options,
    }

    if (!this.isReady()) {
      this.getBroadcast().once('ready', () => {
        setTimeout(() => {
          this.webchatService.triggerElement({
            teaserButton: options.teaserButton,
            successor: options.successor,
          })
        }, 250)
      })

      if (config.suppressInitialElement) {
        this.setInitialElement({
          suppress: true,
        })
      }

      if (config.showChatbox) {
        this.getChatboxWidget().show()
      } else {
        this.loadChat()
      }
    }

    if (this.isReady()) {
      if (!this.getChatboxWidget().isVisible() && config.showChatbox) {
        this.getChatboxWidget().show()
      }

      this.webchatService.triggerElement({
        teaserButton: options.teaserButton,
        successor: options.successor,
      })
    }
  }

  destroy() {
    if (this.destroyed) {
      return
    }

    this.destroyed = true

    this.unreadWidget.destroy()
    this.teaserWidget.destroy()
    this.buttonWidget.destroy()
    this.iframeWidget.destroy()
    this.chatboxWidget.destroy()
    this.wrapperWidget.destroy()
    this.actionButtonGroupWidget.destroy()

    this.broadcast.fire('destroy')

    this.broadcast.offAll()
  }

  isDestroyed(): boolean {
    return this.destroyed
  }

  isReady(): boolean {
    return !this.destroyed && this.ready
  }

  loadChat() {
    if (!this.iframeWidget.isRendered()) {
      this.iframeWidget.render(this.chatboxWidget.getBoxElem())
    }

    if (!this.iframeWidget.isLoaded()) {
      UserService.touchUser(
        this.options.id,
        this.options.locale,
        this.csrfToken,
      ).then((currentUserId: string) => this.iframeWidget.load(currentUserId))
    }
  }

  setActionButtons(buttons: MixedObject) {
    this.actionButtonGroupWidget.clearButtons()

    buttons.forEach((item: MixedObject) => {
      this.actionButtonGroupWidget.addButton({
        ...item,
        locale: this.options.locale,
        app: this,
      })
    })
  }
}
