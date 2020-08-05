import { ApiService, CookieService } from './'
import { parseUrlParam } from '../core/utils'

const customerIdCookieName = 'ds-custid'

export class UserService {
  static getCustomerId(): string | null {
    return CookieService.get(customerIdCookieName)
  }

  static setCustomerId(id: string, expires?: number) {
    CookieService.set(customerIdCookieName, id, {
      expires: expires ? expires : 86400 * 90, // 90 days
    })
  }

  static updateCookieLifetime(forgetCustomerAfterHours: number) {
    UserService.setCustomerId(
      UserService.getCustomerId(),
      3600 * forgetCustomerAfterHours,
    )
  }

  static touchUser(
    clientId: string,
    locale: string,
    csrfToken?: string,
  ): Promise<string> {
    return new Promise((resolve: any) => {
      let source = 'pwa-embed'
      const currentUserId = CookieService.get(customerIdCookieName)

      if (!clientId) {
        throw new Error('Client ID is undefined')
      }

      if (document.referrer.indexOf('/g/') !== -1) {
        source = 'pwa-c2o'
      }

      if (
        parseUrlParam(window.location.href, 'ctrl') === 'forcenew' ||
        !currentUserId
      ) {
        ApiService.createUser({
          clientId,
          source,
          locale,
          csrfToken,
        }).then((data: any) => {
          UserService.setCustomerId(data.custid)

          resolve(data.custid)
        })
      } else if (currentUserId) {
        const currentURL = parseUrlParam(window.location.href, 'curl')

        ApiService.validateUser({
          clientId,
          currentUserId,
          currentURL,
        })
          .then(() => {
            resolve(currentUserId)
          })
          .catch(() => {
            ApiService.createUser({
              clientId,
              source,
              locale,
              csrfToken,
            }).then((data: any) => {
              UserService.setCustomerId(data.custid)

              resolve(data.custid)
            })
          })
      }
    })
  }
}
