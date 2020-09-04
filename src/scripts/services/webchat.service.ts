import { MixedObject } from '../types'

export interface WebchatServiceOptions {
  targetWindow: HTMLIFrameElement
}

export interface WebchatServiceTriggerOptions {
  successor?: string
  teaserButton?: boolean
}

export class WebchatService {
  private targetWindow: HTMLIFrameElement

  constructor(options: WebchatServiceOptions) {
    this.targetWindow = options.targetWindow
  }

  triggerElement(options: WebchatServiceTriggerOptions) {
    const message: any = {
      successor: options.successor,
      type: 'trigger',
    }

    if (options.teaserButton) {
      message.teaserButton = options.teaserButton
    }

    this.targetWindow.contentWindow.postMessage(message, '*')
  }

  setMinimized(isMinimized: boolean) {
    const message = {
      isMinimized,
      type: 'setMinimized',
    }

    this.targetWindow.contentWindow.postMessage(message, '*')
  }
}
