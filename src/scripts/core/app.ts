import { config } from '../config/config'
import { EventEmitter, Event } from './event-emitter'
import { WidgetManager } from './widget-manager'
import {
  ApiService,
  WebchatService,
  CookieService,
  UserService,
  TokenService
} from '../services'
import {
  parseUrlParam,
  isExternalUrl,
  injectCss,
  mergeDeep,
  removeURLParameters,
  inIframe
} from './utils'
import { MixedObject } from '../types'
import { CustidStoreMode } from '../enums'

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
  renderWaButton?: boolean
  showTeaserOnce?: boolean
  renderButton?: boolean
  showFooter?: boolean
  initialElement?: InitialElement
  unreadCounter?: number
  context?: MixedObject
  direction?: 'rtl' | 'ltr'
  extendedWidth?: boolean
  bwWaButton?: boolean
  baseCls?: string
  showInIframe?: boolean
  custidStoreMode?: CustidStoreMode
  loadGaContext?: boolean
  channelOverride?: string
  leftCloseButton?: boolean
}

const appOptionsDefault = {
  locale: 'en',
  theme: AppTheme.round,
  position: ChatPosition.right,
  isChatboxVisible: false,
  isButtonVisible: true,
  renderWaButton: false,
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
  showInIframe: false,
  custidStoreMode: CustidStoreMode.cookie,
  loadGaContext: false,
  leftCloseButton: false,
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
  showWhatsApp = 'show.whatsApp',
}

export interface ActionEvent {
  type: ActionEventType
  name: string
  payload: MixedObject
}

export class App {
  private broadcast: EventEmitter
  private webchatService: WebchatService
  private chatConfig: MixedObject
  private destroyed = false
  private ready = false
  private csrfToken: string
  private isTeaserVisible = false
  private widgetManager: WidgetManager
  public options: AppOptions

  constructor(options: AppOptions) {
    if (!options) {
      throw Error('Please provide Dialogshift chat configuration')
    }

    if (!options.id) {
      throw Error('Dialogshift app id is undefined.')
    }

    this.options = mergeDeep(appOptionsDefault, options) as AppOptions
    this.broadcast = new EventEmitter()
    this.widgetManager = new WidgetManager(this)

    this.init()
  }

  private init() {
    this.options.context['hostUrl'] = encodeURI(window.location.href);

    if (parseUrlParam(window.location.href, 'ctrl') === 'forcenew') {
      UserService.deleteUser()
      TokenService.deleteToken()
      // CookieService.delete('ds-keep-chat-open')
      removeURLParameters(['ctrl'])
    }

    const openUrlParam = parseUrlParam(window.location.href, 'dschat')

    if (openUrlParam === 'open' && window.innerWidth > 576) {
      this.options.isChatboxVisible = true
    }

    this.loadConfig().then(() => {
      if (this.chatConfig.showWebsiteChat === false) {
        return
      }

      if (this.chatConfig.enableCSRFProtection) {
        let csrfAfter = 0

        if (this.chatConfig.csrfAfter) {
          csrfAfter = this.chatConfig.csrfAfter
        }

        TokenService.touchToken(this.options.id, csrfAfter).then(
          (token: string) => {
            this.csrfToken = token
          },
        )

        this.afterInit()
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
    const isWidgetManagerVisible = this.options.showInIframe
      ? true
      : inIframe()
        ? false
        : true

    this.widgetManager.renderWrapper(
      Object.assign({}, this.options, {
        visible: isWidgetManagerVisible,
      }),
    )
    this.widgetManager.renderContentWrapper()
    this.widgetManager.renderFooter()

    if (this.options.renderButton) {
      this.widgetManager.renderChatButton(this.options, this.chatConfig)
    }

    this.widgetManager.renderTeaserWidget(
      this.options,
      this.chatConfig,
      this.isTeaserVisible,
    )

    this.widgetManager.renderActionButtonGroupWidget(
      this,
      this.options,
      this.chatConfig,
    )

    this.widgetManager.renderChatboxWidget(this.options, () => {
      this.loadChat()
    })

    this.widgetManager.renderHeader(
      this.options,
    )

    this.widgetManager.renderUnreadWidget(this.options, this.chatConfig)

    if (this.options.renderWaButton) {
      this.widgetManager.renderWhatsappButtonWidget(this.chatConfig)
      this.widgetManager.renderWhatsappWindowWidget(this.options)
    }

    this.widgetManager.renderIframeBox()

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

    /* if (CookieService.get('keep-chat-open') === 'true') {
      this.setInitialElement({
        suppress: true,
      })
      this.loadChat()

      this.getBroadcast().once('ready', () => {
        setTimeout(() => {
          this.webchatService.setMinimized(true)
        }, 250)
      })
    } */
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

        if (message.payload && message.payload.openInBox === true) {
          this.widgetManager.getIframeBoxWidget().load(message.payload.url)

          setTimeout(() => {
            if (message.payload.boxWidth) {
              this.widgetManager
                .getIframeBoxWidget()
                .setWidth(message.payload.boxWidth)
            } else {
              this.widgetManager.getIframeBoxWidget().setWidth('376')
            }

            this.widgetManager.getIframeBoxWidget().show()
          }, 300)
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

      if (commandModel.commandType === 'receivedCookieConsent') {
        UserService.switchToCookieModeAfterConsent()
      } else if (commandModel.commandType === 'dismissCookieConsent') {
        UserService.switchToSessionModeAfterConsentDismiss()
      } /* else if (commandModel.commandType === 'livechat') {
        if (
          commandModel.action === 'start' &&
          this.chatConfig.keepChatOpenDuringLivechat
        ) {
          CookieService.set('keep-chat-open', 'true')
        }

        if (commandModel.action === 'end') {
          CookieService.set('keep-chat-open', 'false')
        }
      } */
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
      this.widgetManager.getTeaserWidget().setContent(message.payload.text)
      this.widgetManager.getTeaserWidget().show({
        force: true,
      })
    }

    if (message.name === ActionEventName.showChatbox) {
      this.widgetManager.getChatboxWidget().show()
    }

    if (message.name === ActionEventName.hideChatbox) {
      this.widgetManager.getChatboxWidget().hide()
    }

    if (message.name === ActionEventName.showWhatsApp) {
      this.widgetManager.getWhatsappWindowWidget().show()
    }
  }

  private loadConfig(): Promise<MixedObject> {
    const channel = this.options.context.channel
      ? this.options.context.channel
      : 'pwa-embed'

    return ApiService.getConfig(
      this.options.id,
      UserService.getCustomerId(),
      window.location.host,
      channel,
    ).then((data: MixedObject) => {
      this.chatConfig = data

      if (data.websiteElementCss) {
        injectCss(data.websiteElementCss)
      }

      if (this.chatConfig.defaultLg) {
        this.chatConfig.defaultLocale = this.chatConfig.defaultLg
        delete this.chatConfig.defaultLg
      }

      if (this.chatConfig.channelOverride) {
        this.options.context.channel = this.chatConfig.channelOverride
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
      isChatboxVisible,
      renderWaButton,
      extendedWidth,
      bwWaButton,
      custidStoreMode,
      loadGaContext,
    } = this.chatConfig

    if (setUnreadCounter) {
      this.options.unreadCounter = setUnreadCounter
    }

    if (isChatboxVisible !== undefined) {
      this.options.isChatboxVisible = isChatboxVisible
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

    if (renderWaButton) {
      this.options.renderWaButton = renderWaButton
    }

    if (extendedWidth) {
      this.options.extendedWidth = extendedWidth
    }

    if (bwWaButton) {
      this.options.bwWaButton = bwWaButton
    }

    if (custidStoreMode) {
      this.options.custidStoreMode = custidStoreMode
      UserService.custidStoreMode = custidStoreMode
    }

    if (loadGaContext) {
      this.options.loadGaContext = loadGaContext
      UserService.loadGaContext = loadGaContext
    }
  }

  getWebchatService(): WebchatService {
    return this.webchatService
  }

  getBroadcast(): EventEmitter {
    return this.broadcast
  }

  getWidgetManager(): WidgetManager {
    return this.widgetManager
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
        this.widgetManager.getChatboxWidget().show()
      } else {
        this.loadChat()
      }
    }

    if (this.isReady()) {
      if (
        !this.widgetManager.getChatboxWidget().isVisible() &&
        config.showChatbox
      ) {
        this.widgetManager.getChatboxWidget().show()
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

    this.widgetManager.destroy()

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
    const load = () => {
      const iframeWidget = this.widgetManager.getIframeWidget()

      if (!iframeWidget.isLoaded()) {
        iframeWidget.setLoaded(true)

        UserService.touchUser(
          this.options.id,
          this.options.locale,
          this.csrfToken,
          this.options.context,
        ).then((customerId: string) => {
          // Debug interval
          setTimeout(() => {
            iframeWidget.load(customerId)
          }, 20)
        })
      }
    }

    const iframeWidget = this.widgetManager.getIframeWidget()

    if (!iframeWidget || !iframeWidget.isRendered()) {
      const channel = this.options.context.channel
        ? this.options.context.channel
        : 'pwa-embed'
      const { id, initialElement, locale } = this.options

      this.widgetManager.renderIframeWidget(
        {
          id,
          initialElement,
          locale,
          channel,
          host: (config as MixedObject).env.iframeHost,
        },
        () => {
          // For a separate thread. @todo refactor render flow.
          setTimeout(() => {
            this.initWebchatService()
            load()
          }, 20)
        },
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

  setLocale(locale: string) {
    this.options.locale = locale
    this.widgetManager.setLocale(locale, this.chatConfig)
  }
}
