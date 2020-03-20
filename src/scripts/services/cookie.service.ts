export class CookieService {
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

  static set(name: string, value: any, options: any = {}) {
    let expires = options.expires

    if (typeof expires === 'number' && expires) {
      const d = new Date()

      d.setTime(d.getTime() + expires * 1000)
      expires = options.expires = d
    }

    if (expires && expires.toUTCString) {
      options.expires = expires.toUTCString()
    }

    const encodedValue = encodeURIComponent(value)

    let updatedCookie = `${name}=${encodedValue}`

    for (const propName in options) {
      updatedCookie = `${updatedCookie}; ${propName}`

      const propValue = options[propName]

      if (propValue !== true) {
        updatedCookie = `${updatedCookie}=${propValue}`
      }
    }

    document.cookie = updatedCookie
  }
}
