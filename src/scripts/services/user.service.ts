import { ApiService, CookieService, TokenService } from './'
import { parseUrlParam } from '../core/utils'
import { MixedObject } from '../types'
import { CustidStoreMode } from '../enums'
import { GaService } from './ga.service'

const customerIdCookieName = 'ds-custid'

export class UserService {
  static custidStoreMode = CustidStoreMode.cookie
  static loadGaContext = false
  static customerId: string | null = null
  static cookieLifetime: number = 90

  static getCustomerId(): string | null {
    if (this.custidStoreMode === CustidStoreMode.cookie) {
      return CookieService.get(customerIdCookieName)
    } else {
      let customerId: string | null = this.customerId
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
        expires: expires ? expires : 3600 * this.cookieLifetime,
      })
    } else {
      this.customerId = id
    }
  }

  static deleteCustomerId() {
    if (this.custidStoreMode === CustidStoreMode.cookie) {
      CookieService.delete(customerIdCookieName)
    } else {
      this.customerId = null
    }
  }

  static updateCookieLifetime(forgetCustomerAfterHours: number) {
    if (this.custidStoreMode === CustidStoreMode.cookie && UserService.getCustomerId()) {
      UserService.setCustomerId(
        UserService.getCustomerId() as string,
        3600 * forgetCustomerAfterHours,
      )
    }
  }

  static switchToCookieModeAfterConsent() {
    this.custidStoreMode = CustidStoreMode.cookie
    const customerId = this.customerId
    if (customerId !== null) {
      UserService.saveCustomerId(customerId)
    }
  }

  static switchToSessionModeAfterConsentDismiss() {
    const customerId = CookieService.get(customerIdCookieName)
    UserService.deleteCustomerId()
    this.custidStoreMode = CustidStoreMode.session
    if (customerId !== null) {
      this.customerId = customerId
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

      if (this.loadGaContext) {
        const ga = GaService.getGaValue()
        if (ga !== null && context) {
          context['_ga'] = ga
        }
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
        const currentURL = parseUrlParam(window.location.href, 'curl') as string

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
  }
}
