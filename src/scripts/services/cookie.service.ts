import { MixedObject } from '../types'

export class CookieService {
  static noCookieMode = false

  static get(name: string): string | null {
    const arrcookies = document.cookie.split(';')

    for (let i = 0; i < arrcookies.length; i++) {
      let x = arrcookies[i].substr(0, arrcookies[i].indexOf('='))
      const y = arrcookies[i].substr(arrcookies[i].indexOf('=') + 1)
      x = x.replace(/^\s+|\s+$/g, '')

      if (x === name) {
        return unescape(y)
      }
    }

    return null
  }

  static set(
    name: string,
    value: string | number | boolean,
    options: MixedObject = {},
  ): void {
    if (CookieService.noCookieMode) {
      return
    }

    const params: MixedObject = {
      samesite: 'lax',
      path: '/',
      ...options,
    }

    let expires = params.expires

    if (typeof expires === 'number' && expires) {
      const d = new Date()

      d.setTime(d.getTime() + expires * 1000)
      expires = params.expires = d
    }

    if (expires && expires.toUTCString) {
      params.expires = expires.toUTCString()
    }

    const encodedValue = encodeURIComponent(value)

    let updatedCookie = `${name}=${encodedValue}`

    for (const propName in params) {
      updatedCookie = `${updatedCookie}; ${propName}`

      const propValue = params[propName]

      if (propValue !== true) {
        updatedCookie = `${updatedCookie}=${propValue}`
      }
    }

    document.cookie = updatedCookie
  }

  static delete(name: string) {
    CookieService.set(name, '', {
      'max-age': -1,
    })
  }
}
