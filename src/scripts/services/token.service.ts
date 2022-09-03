import { MixedObject } from '../types'
import { ApiService, CookieService, UserService } from '.'
import { isCrawler } from '../core/utils'

const csrfCookieName = 'ds-csrf'

export class TokenService {
  static touchToken(clientId: string, csrfAfter: number): Promise<string> {
    return new Promise((resolve: any) => {
      const customerId = UserService.getCustomerId()
      const csrftoken = CookieService.get(csrfCookieName)
      const sec = btoa(window.screen.width.toString())
      const realUserScore = isCrawler() ? 0 : 100

      if (customerId) {
        resolve(customerId)
      } else if (csrftoken) {
        resolve(csrftoken)
      } else {
        setTimeout(() => {
          if (UserService.getCustomerId()) {
            return
          }

          ApiService.createToken({
            clientId,
            csrftoken,
            sec,
            realUserScore,
          }).then((response: MixedObject) => {
            if (!csrftoken) {
              CookieService.set(csrfCookieName, response.csrftoken, {
                expires: 86400 * 7, // 7 days
              })

              resolve(response.csrftoken)
            }
          })
        }, csrfAfter)
      }
    })
  }

  static deleteToken() {
    CookieService.delete(csrfCookieName)
  }
}
