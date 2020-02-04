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
  WebchatServiceTriggerOptions,
} from '../services'
import { parseUrlParam, isExternalUrl, injectCss, mergeDeep } from './utils'

export interface ChatConfig {
  [key: string]: any
}

export interface Visitor {
  id: string
}

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
  isTeaserVisible?: boolean
  renderButton?: boolean
  buttonText?: string
  teaserText?: string
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
  isTeaserVisible: false,
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
}

export interface ActionEvent {
  type: ActionEventType
  name: string
  payload: { [key: string]: any }
}

export class App {
  private options: AppOptions
  private wrapperWidget: WrapperWidget
  private buttonWidget: ButtonWidget
  private chatboxWidget: ChatboxWidget
  private iframeWidget: IframeWidget
  private teaserWidget: TeaserWidget
  private unreadWidget: UnreadWidget
  private broadcast: EventEmitter
  private visitor: Visitor
  private apiService: ApiService
  private webchatService: WebchatService
  private chatConfig: ChatConfig
  private destroyed = false
  private ready = false

  constructor(options: AppOptions) {
    if (!options) {
      throw Error('Please provide Dialogshift chat configuration')
    }

    if (!options.id) {
      throw Error('Dialogshift app id is undefined.')
    }

    this.apiService = new ApiService()
    this.options = mergeDeep(appOptionsDefault, options) as AppOptions
    this.broadcast = new EventEmitter()

    this.init()
  }

  private init() {
    const openUrlParam = parseUrlParam(window.location.href, 'dschat')

    if (openUrlParam === 'open') {
      this.options.isChatboxVisible = true
    }

    this.loadConfig().then((response: ChatConfig) => {
      if (this.chatConfig.showWebsiteChat === false) {
        return
      }

      this.applyConfig()
      this.render()
      this.afterRender()
      this.bindEvents()

      setTimeout(() => {
        this.broadcast.fire('init')
      }, 20)
    })
  }

  private initWebchatService() {
    this.webchatService = new WebchatService({
      targetWindow: this.iframeWidget.getBoxElem(),
    })
  }

  private render() {
    this.renderWrapperWidget()

    if (this.options.renderButton) {
      this.renderButtonWidget()
    }

    this.createIframeWidget()
    this.renderTeaserWidget()
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
  }

  private bindEvents() {
    window.addEventListener('message', event => {
      if (event.origin === (config as any).env.iframeHost) {
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
  }

  private proceedActionEvent(message: any) {
    if (message.name === ActionEventName.userReady) {
      this.visitor = { id: message.payload.id }
    }

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

            if (this.options.isTeaserVisible) {
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
    this.buttonWidget = new ButtonWidget({
      content: this.options.buttonText,
      renderTo: this.wrapperWidget.getBoxElem(),
      visible: this.options.isButtonVisible,
      events: [
        {
          type: 'toggle',
          callback: event => {
            event.data.isPressed
              ? this.chatboxWidget.show()
              : this.chatboxWidget.hide()
          },
        },
        {
          type: 'before:show',
          callback: event => this.broadcast.fire('button.show.before'),
        },
        {
          type: 'show',
          callback: event => this.broadcast.fire('button.show'),
        },
        {
          type: 'before:hide',
          callback: event => this.broadcast.fire('button.hide.before'),
        },
        {
          type: 'hide',
          callback: event => this.broadcast.fire('button.hide'),
        },
      ],
    })
  }

  private renderWrapperWidget() {
    this.wrapperWidget = new WrapperWidget({
      renderTo: document.body,
      position: this.options.position,
      theme: this.options.theme,
    })

    if (!this.options.renderButton) {
      this.wrapperWidget.addCls(config.wrapperNoButtonCls)
    }
  }

  private createIframeWidget() {
    this.iframeWidget = new IframeWidget({
      host: (config as any).env.iframeHost,
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

  private renderTeaserWidget() {
    this.teaserWidget = new TeaserWidget({
      renderTo: this.wrapperWidget.getBoxElem(),
      content: this.options.teaserText,
      visible: this.options.isTeaserVisible,
      events: [
        {
          type: 'before:show',
          callback: event => {
            this.broadcast.fire('teaser.show.before')

            this.wrapperWidget.addCls(config.wrapperTeaserIsOpenCls)
          },
        },
        {
          type: 'show',
          callback: event => this.broadcast.fire('teaser.show'),
        },
        {
          type: 'before:hide',
          callback: event => {
            this.wrapperWidget.removeCls(config.wrapperTeaserIsOpenCls)

            this.broadcast.fire('teaser.hide.before')
          },
        },
        {
          type: 'hide',
          callback: event => this.broadcast.fire('teaser.hide'),
        },
        {
          type: 'click',
          callback: event => this.chatboxWidget.show(),
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

  private loadConfig(): Promise<ChatConfig> {
    return this.apiService.getConfig(this.options.id).then((data: any) => {
      this.chatConfig = data

      if (data.websiteElementCss) {
        injectCss(data.websiteElementCss)
      }

      return this.chatConfig
    })
  }

  private applyConfig() {
    const {
      teaserText,
      setUnreadCounter,
      showTeaserAfter,
      hideTeaserAfter,
      theme,
    } = this.chatConfig
    const { locale } = this.options

    if (teaserText && teaserText[locale]) {
      this.options.teaserText = teaserText[locale]
    }

    if (setUnreadCounter) {
      this.options.unreadCounter = setUnreadCounter
    }

    if (showTeaserAfter === 0) {
      this.options.isTeaserVisible = true
    }

    if (hideTeaserAfter === 0) {
      this.options.isTeaserVisible = false
    }

    if (theme && theme in AppTheme) {
      this.options.theme = theme
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

  getContext(key: string): Promise<any> {
    return this.apiService.getContext(this.getVisitor().id, key)
  }

  setContext(key: string, value: any): Promise<any> {
    return this.apiService.setContext(this.getVisitor().id, key, value)
  }

  getVisitor(): Visitor {
    return this.visitor
  }

  getConfig(): ChatConfig {
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

  triggerElement(options: WebchatServiceTriggerOptions) {
    if (this.webchatService) {
      this.webchatService.triggerElement(options)
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

    this.broadcast.fire('destroy')

    this.broadcast.offAll()
  }

  isDestroyed(): boolean {
    return this.destroyed
  }

  isReady() {
    return !this.destroyed && this.ready
  }

  loadChat() {
    if (!this.iframeWidget.isRendered()) {
      this.iframeWidget.render(this.chatboxWidget.getBoxElem())
    }

    if (!this.iframeWidget.isLoaded()) {
      this.iframeWidget.load()
    }
  }
}
