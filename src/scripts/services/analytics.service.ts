import { MixedObject } from '../types'
import { ApiService, CookieService } from './'

const csrfCookieName = 'ds-csrf'

export class AnalyticsService {
  static touchToken(clientId: string): Promise<string> {
    return new Promise((resolve: any) => {
      const csrftoken = CookieService.get(csrfCookieName)
      const sec = btoa(window.screen.width.toString())

      if (csrftoken) {
        resolve(csrftoken)
      }

      ApiService.createToken({
        clientId,
        csrftoken,
        sec,
      }).then((response: MixedObject) => {
        if (!csrftoken) {
          CookieService.set(csrfCookieName, response.csrftoken, {
            expires: 86400 * 7, // 7 days
          })

          resolve(response.csrftoken)
        }
      })
    })
  }

  static deleteToken() {
    CookieService.delete(csrfCookieName)
  }
}
