import { ApiService, CookieService, TokenService } from './'
import { parseUrlParam } from '../core/utils'
import { MixedObject } from '../types'
import { CustidStoreMode } from '../enums'

const customerIdCookieName = 'ds-custid'

export class UserService {
  static custidStoreMode = CustidStoreMode.cookie

  static getCustomerId(): string | null {
    if (this.custidStoreMode === CustidStoreMode.cookie) {
      return CookieService.get(customerIdCookieName)
    } else {
      let customerId: string | null = sessionStorage.getItem(customerIdCookieName)
      if (customerId === null) {
        customerId = CookieService.get(customerIdCookieName)
      }
      return customerId
    }
  }

  static setCustomerId(id: string, expires?: number) {
    this.saveCustomerId(id, expires)

    TokenService.deleteToken()
  }

  static saveCustomerId(id: string, expires?: number) {
    if (this.custidStoreMode === CustidStoreMode.cookie) {
      CookieService.set(customerIdCookieName, id, {
        expires: expires ? expires : 86400 * 90, // 90 days
      })
    } else {
      sessionStorage.setItem(customerIdCookieName, id)
    }
  }

  static deleteCustomerId() {
    if (this.custidStoreMode === CustidStoreMode.cookie) {
      CookieService.delete(customerIdCookieName)
    } else {
      sessionStorage.removeItem(customerIdCookieName)
      if (CookieService.get(customerIdCookieName) !== null) {
        CookieService.delete(customerIdCookieName)
      }
    }
  }

  static updateCookieLifetime(forgetCustomerAfterHours: number) {
    if (this.custidStoreMode === CustidStoreMode.cookie && UserService.getCustomerId()) {
      UserService.setCustomerId(
        UserService.getCustomerId(),
        3600 * forgetCustomerAfterHours,
      )
    }
  }

  static switchToCookieModeAfterConsent() {
    this.custidStoreMode = CustidStoreMode.cookie
    const customerId = sessionStorage.getItem(customerIdCookieName)
    if (customerId !== null) {
      UserService.saveCustomerId(customerId)
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
      const customerId = this.getCustomerId()

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
    this.deleteCustomerId()
    sessionStorage.removeItem('ds-times-counter')
    sessionStorage.removeItem('ds-teaser-display')
  }
}
