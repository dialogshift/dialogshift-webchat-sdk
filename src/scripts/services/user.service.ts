import { ApiService, CookieService } from './'
import { parseUrlParam } from '../core/utils'

export class UserService {
  static updateCookieLifetime(forgetCustomerAfterHours: number) {
    const cookieUserId = CookieService.get('ds-custid')

    CookieService.set('ds-custid', cookieUserId, {
      expires: 3600 * forgetCustomerAfterHours,
    })
  }

  static touchUser(clientId: string, locale: string): Promise<string> {
    return new Promise((resolve: any) => {
      let source = 'pwa-embed'
      const currentUserId = CookieService.get('ds-custid')

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
        }).then((data: any) => {
          CookieService.set('ds-custid', data.custid, {
            expires: 86400 * 90, // 90 days
          })

          resolve(data.custid)
        })
      } else if (currentUserId) {
        const currentURL = parseUrlParam(window.location.href, 'curl')

        ApiService.validateUser({
          clientId,
          currentUserId,
          currentURL,
        }).then(() => {
          resolve(currentUserId)
        })
        .catch(() => {
          ApiService.createUser({
            clientId,
            source,
            locale,
          }).then((data: any) => {
            CookieService.set('ds-custid', data.custid, {
              expires: 86400 * 90, // 90 days
            })

            resolve(data.custid)
          })
        })
      }
    })
  }
}
