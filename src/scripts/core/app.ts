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
import { getUrlParam, isExternalUrl, injectCss } from './utils'

export interface ChatConfig {
  ga: string
  showFooter: boolean
  teaserText?: {
    de: string
    en: string,
  }
  websiteElementCss?: string
}

export interface Visitor {
  id: string
}

export enum ChatPosition {
  left = 'left',
  right = 'right',
}

export interface AppOptions {
  id: string
  locale?: string
  position?: ChatPosition
  isChatboxVisible?: boolean
  isButtonVisible?: boolean
  isTeaserVisible?: boolean
  renderButton?: boolean
  buttonText?: string
  teaserText?: string
  showFooter?: boolean
  initialElement: string
  unreadCounter?: number
}

const appOptionsDefault = {
  locale: 'en',
  position: ChatPosition.right,
  isChatboxVisible: false,
  isButtonVisible: true,
  isTeaserVisible: false,
  renderButton: true,
  showFooter: true,
  initialElement: '',
  unreadCounter: 0,
}

export enum ActionEventType {
  action = 'action',
  message = 'message',
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

  constructor(options: AppOptions) {
    if (!options) {
      throw Error('Please provide Dialogshift chat configuration')
    }

    if (!options.id) {
      throw Error('Dialogshift app id is undefined.')
    }

    this.apiService = new ApiService()
    this.options = Object.assign(appOptionsDefault, options)
    this.broadcast = new EventEmitter()

    this.init()
  }

  private init() {
    const openUrlParam = getUrlParam('dschat')

    if (openUrlParam === 'open') {
      this.options.isChatboxVisible = true
    }

    this.loadConfig().then(() => {
      this.render()
      this.bindEvents()
      this.broadcast.fire('render')
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

  private bindEvents() {
    window.addEventListener('message', event => {
      if (event.origin === (config as any).env.iframeHost) {
        const message = event.data as ActionEvent

        if (message.type === ActionEventType.message) {
          this.broadcast.fire(message.name, message.payload)
        }

        if (message.type === ActionEventType.action) {
          this.proceedActionEvent(message)
        }
      }
    })

    this.broadcast.on('message.received', (event: Event) => {
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

            if (!this.iframeWidget.isRendered()) {
              this.iframeWidget.render(this.chatboxWidget.getBoxElem())
            }

            if (!this.iframeWidget.isLoaded()) {
              this.iframeWidget.load()
            }
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
          callback: event => this.broadcast.fire('teaser.show.before'),
        },
        {
          type: 'show',
          callback: event => this.broadcast.fire('teaser.show'),
        },
        {
          type: 'before:hide',
          callback: event => this.broadcast.fire('teaser.hide.before'),
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
      this.chatConfig = {
        ga: data.ga,
        showFooter: data.showFooter,
        teaserText: data.teaserText,
        websiteElementCss: data.websiteElementCss,
      }

      if (data.websiteElementCss) {
        injectCss(data.websiteElementCss)
      }

      if (
        !this.options.teaserText &&
        data.teaserText &&
        data.teaserText[this.options.locale]
      ) {
        this.options.teaserText = data.teaserText[this.options.locale]
      }

      return this.chatConfig
    })
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

  removeInitialElement() {
    this.options.initialElement = ''
    this.iframeWidget.removeInitialElement()
  }

  triggerElement(options: WebchatServiceTriggerOptions) {
    if (this.webchatService) {
      this.webchatService.triggerElement(options)
    }
  }
}
