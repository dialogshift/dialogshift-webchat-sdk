export interface WebchatServiceOptions {
  targetWindow: HTMLIFrameElement
}

export interface WebchatServiceTriggerOptions {
  successor?: string
  payload?: { [key: string]: any }
}

export class WebchatService {
  private targetWindow: HTMLIFrameElement

  constructor(options: WebchatServiceOptions) {
    this.targetWindow = options.targetWindow
  }

  triggerElement(options: WebchatServiceTriggerOptions) {
    const message = {
      ...options,
      type: 'trigger',
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
