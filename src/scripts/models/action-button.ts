import { MixedObject } from '../types'

export enum ActionButtonType {
  quickreply = 'quickreply',
  callback = 'callback',
}

export class ActionButton {
  private type: ActionButtonType
  private successor: string
  private l10n: {
    [key: string]: {
      title: string,
    },
  }
  private callback: Function

  constructor(options: MixedObject) {
    this.type = options.type
    this.successor = options.successor
    this.l10n = options.l10n

    if (options.callback) {
      this.callback = options.callback
    }
  }

  static fromJson(json: MixedObject): ActionButton {
    const normalizedData = ActionButtonNormalizer.normalize(json)

    return new ActionButton(normalizedData)
  }

  getTitle(locale: string): string {
    if (this.l10n[locale]) {
      return this.l10n[locale].title
    }

    return ''
  }

  getSuccessor(): string {
    return this.successor
  }

  getType(): ActionButtonType {
    return this.type
  }

  getCallback(): Function {
    return this.callback
  }
}

export class ActionButtonNormalizer {
  static normalize(data: MixedObject): MixedObject {
    const result: MixedObject = {
      type: data.type,
      successor: data.successor,
      l10n: {},
    }

    if (data.en) {
      result.l10n.en = data.en
    }

    if (data.de) {
      result.l10n.de = data.de
    }

    if (data.callback) {
      result.callback = data.callback
    }

    return result
  }
}
