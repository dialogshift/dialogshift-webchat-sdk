import { MixedObject } from '../types'
import { ApiService, CookieService } from './'

const csrfCookieName = 'ds-csrf'

export class AnalyticsService {
  static touchToken(clientId: string): Promise<string> {
    return new Promise((resolve: any) => {
      const csrftoken = CookieService.get(csrfCookieName)

      if (csrftoken) {
        resolve(csrftoken)
      }

      ApiService.createToken({
        clientId,
        csrftoken,
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
}
