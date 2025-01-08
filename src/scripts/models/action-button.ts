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
  private defaultLocale?: string

  constructor(options: MixedObject) {
    this.type = options.type
    this.successor = options.successor
    this.l10n = options.l10n

    if (options.callback) {
      this.callback = options.callback
    }

    if (options.defaultLocale) {
      this.defaultLocale = options.defaultLocale
    }
  }

  static fromJson(json: MixedObject): ActionButton {
    const normalizedData = ActionButtonNormalizer.normalize(json)

    return new ActionButton(normalizedData)
  }

  getTitle(locale: string): string | null {
    if (this.l10n[locale]) {
      return this.l10n[locale].title
    }

    if (this.l10n[this.defaultLocale]) {
      return this.l10n[this.defaultLocale].title
    }

    return null
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
    const locales = ['en', 'de', 'fr', 'it', 'ru', 'ar', 'nl', 'cz', 'hu', 'ro', 'es', 'da', 'pl', 'cs', 'sv']
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

    if (data.defaultLocale) {
      result.defaultLocale = data.defaultLocale
    }

    return result
  }
}
