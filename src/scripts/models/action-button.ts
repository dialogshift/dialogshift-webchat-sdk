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
    const locales = ['en', 'de', 'fr', 'it', 'ru', 'ar']
    const result: MixedObject = {
      type: data.type,
      successor: data.successor,
      l10n: {},
    }

    locales.forEach((locale: string) => {
      if (data.hasOwnProperty(locale)) {
        result.l10n[locale] = data[locale]
      }
    })

    if (data.callback) {
      result.callback = data.callback
    }

    return result
  }
}
