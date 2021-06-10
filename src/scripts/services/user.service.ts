import { ApiService, CookieService, TokenService } from './'
import { parseUrlParam } from '../core/utils'
import { MixedObject } from '../types'

const customerIdCookieName = 'ds-custid'

export class UserService {
  static getCustomerId(): string | null {
    return CookieService.get(customerIdCookieName)
  }

  static setCustomerId(id: string, expires?: number) {
    CookieService.set(customerIdCookieName, id, {
      expires: expires ? expires : 86400 * 90, // 90 days
    })

    TokenService.deleteToken()
  }

  static updateCookieLifetime(forgetCustomerAfterHours: number) {
    if (UserService.getCustomerId()) {
      UserService.setCustomerId(
        UserService.getCustomerId(),
        3600 * forgetCustomerAfterHours,
      )
    }
  }

  static touchUser(
    clientId: string,
    locale: string,
    csrfToken?: string,
    context?: MixedObject,
  ): Promise<string> {
    return new Promise((resolve: any) => {
      let source = 'pwa-embed'
      const customerId = CookieService.get(customerIdCookieName)

      if (!clientId) {
        throw new Error('Client ID is undefined')
      }

      if (location.pathname.indexOf('/g/') !== -1) {
        source = 'pwa-c2o'
      }

      // remove one month later 03.03.2021
      if (!customerId && customerId !== 'null') {
        ApiService.createUser({
          clientId,
          source,
          locale,
          csrfToken,
          context,
          debug: '1',
        }).then((data: any) => {
          UserService.setCustomerId(data.custid)

          resolve(data.custid)
        })
      } else {
        const currentURL = parseUrlParam(window.location.href, 'curl')

        ApiService.validateUser({
          clientId,
          customerId,
          currentURL,
          context,
        })
          .then(() => {
            resolve(customerId)
          })
          .catch(() => {
            ApiService.createUser({
              clientId,
              source,
              locale,
              // csrfToken,
              debug: '2',
            }).then((data: any) => {
              UserService.setCustomerId(data.custid)

              resolve(data.custid)
            })
          })
      }
    })
  }

  static deleteUser() {
    CookieService.delete(customerIdCookieName)
    CookieService.delete('times-counter')
    CookieService.delete('teaser-display')
  }
}
