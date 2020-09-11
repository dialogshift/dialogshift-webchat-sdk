import { config } from '../config/config'
import { EventEmitter, Event } from './event-emitter'
import { WidgetManager } from './widget-manager'
import {
  WrapperWidget,
  ChatButtonWidget,
  ChatboxWidget,
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
  context?: MixedObject
  direction?: 'rtl' | 'ltr'
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
  context: {},
  direction: 'ltr',
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
  private broadcast: EventEmitter
  private webchatService: WebchatService
  private chatConfig: MixedObject
  private destroyed = false
  private ready = false
  private csrfToken: string
  private isTeaserVisible = false
  private widgetManager: WidgetManager

  constructor(options: AppOptions) {
    if (!options) {
      throw Error('Please provide Dialogshift chat configuration')
    }

    if (!options.id) {
      throw Error('Dialogshift app id is undefined.')
    }

    this.options = mergeDeep(appOptionsDefault, options) as AppOptions
    this.broadcast = new EventEmitter()
    this.widgetManager = new WidgetManager(this.broadcast, this.webchatService)

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
      targetWindow: this.widgetManager.getIframeWidget().getBoxElem(),
    })
  }

  private render() {
    this.widgetManager.renderWrapper(this.options)
    this.widgetManager.renderContentWrapper()

    if (this.options.renderButton) {
      this.widgetManager.renderChatButton(this.options, this.chatConfig)
    }

    this.widgetManager.renderIframeWidget(this.options, () => {
      this.initWebchatService()
    })

    this.widgetManager.renderTeaserWidget(
      this.options,
      this.chatConfig,
      this.isTeaserVisible,
    )

    this.widgetManager.renderActionButtonGroupWidget(
      this.options,
      this.chatConfig,
    )

    this.widgetManager.renderChatboxWidget(this.options, () => {
      this.loadChat()
    })

    this.widgetManager.renderUnreadWidget(this.options)

    this.broadcast.on('ready', () => {
      this.ready = true
    })
  }

  private afterRender() {
    const { showTeaserAfter, hideTeaserAfter } = this.chatConfig

    if (showTeaserAfter) {
      setTimeout(() => {
        if (
          !this.widgetManager.getTeaserWidget().isVisible() &&
          !this.widgetManager.getChatboxWidget().isVisible()
        ) {
          this.widgetManager.getTeaserWidget().show()
        }
      }, showTeaserAfter * 1000)
    }

    if (hideTeaserAfter) {
      setTimeout(() => {
        this.widgetManager.getTeaserWidget().hide()
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
      if (
        !this.widgetManager.getChatboxWidget().isVisible() &&
        !event.data.fromHistory
      ) {
        this.widgetManager.getUnreadWidget().increase(1)
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
    return this.widgetManager.getWrapperWidget()
  }

  getChatboxWidget(): ChatboxWidget {
    return this.widgetManager.getChatboxWidget()
  }

  getButtonWidget(): ChatButtonWidget {
    return this.widgetManager.getChatButtonWidget()
  }

  getTeaserWidget(): TeaserWidget {
    return this.widgetManager.getTeaserWidget()
  }

  getUnreadWidget(): UnreadWidget {
    return this.widgetManager.getUnreadWidget()
  }

  getActionButtonGroupWidget(): ActionButtonGroupWidget {
    return this.widgetManager.getActionButtonGroupWidget()
  }

  getContext(key: string): Promise<any> {
    return new Promise((resolve, reject) => {
      if (UserService.getCustomerId()) {
        ApiService.getContext(UserService.getCustomerId(), key).then(
          resolve,
          reject,
        )
      } else {
        reject('Can not load context. Customer is not created.')
      }
    })
  }

  setContext(key: string, value: any): Promise<any> {
    return new Promise((resolve, reject) => {
      if (UserService.getCustomerId()) {
        ApiService.setContext(UserService.getCustomerId(), key, value).then(
          resolve,
          reject,
        )
      } else {
        this.options.context[key] = value
      }
    })
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

    if (this.widgetManager.getIframeWidget()) {
      this.widgetManager
        .getIframeWidget()
        .setInitialElement(mergedInitialElement)
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

    this.widgetManager.getUnreadWidget().destroy()
    this.widgetManager.getTeaserWidget().destroy()
    this.widgetManager.getChatButtonWidget().destroy()
    this.widgetManager.getIframeWidget().destroy()
    this.widgetManager.getChatboxWidget().destroy()
    this.widgetManager.getWrapperWidget().destroy()
    this.widgetManager.getActionButtonGroupWidget().destroy()

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
    if (!this.widgetManager.getIframeWidget().isRendered()) {
      this.widgetManager
        .getIframeWidget()
        .render(this.widgetManager.getChatboxWidget().getBoxElem())
    }

    if (!this.widgetManager.getIframeWidget().isLoaded()) {
      UserService.touchUser(
        this.options.id,
        this.options.locale,
        this.csrfToken,
        this.options.context,
      ).then((currentUserId: string) =>
        this.widgetManager.getIframeWidget().load(currentUserId),
      )
    }
  }

  setActionButtons(buttons: MixedObject) {
    this.widgetManager.getActionButtonGroupWidget().clearButtons()

    buttons.forEach((item: MixedObject) => {
      this.widgetManager.getActionButtonGroupWidget().addButton({
        ...item,
        locale: this.options.locale,
        app: this,
      })
    })
  }
}
