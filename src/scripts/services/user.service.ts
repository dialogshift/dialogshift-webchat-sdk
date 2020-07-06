import { MixedObject } from '../types'
import { ApiService, CookieService } from './'
import { parseUrlParam } from '../core/utils'

export class UserService {
  static touchUser(clientId: string, locale: string): Promise<MixedObject> {
    return new Promise((resolve, reject) => {
      let source = 'pwa-embed'
      const currentUserId = CookieService.get('ds-custid')
      console.log('touchUser', currentUserId)
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

          resolve(data)
        })
      } else if (currentUserId) {
        const currentURL = parseUrlParam(window.location.href, 'curl')

        ApiService.validateUser({
          clientId,
          currentUserId,
          currentURL,
        })
          .then((data: any) => {
            resolve(data)
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

              resolve(data)
            })
          })
      }
    })
  }
}
