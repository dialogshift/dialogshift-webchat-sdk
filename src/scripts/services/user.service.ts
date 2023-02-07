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

  static getCustomerId(): string | null {
    if (this.custidStoreMode === CustidStoreMode.cookie) {
      return CookieService.get(customerIdCookieName)
    } else {
      let customerId: string | null = this.customerId
      /* let customerId: string | null = null
      try {
        customerId = sessionStorage.getItem(customerIdCookieName)
      } catch (e) {
        console.log('Session storage blocked.')
      }*/
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
      this.customerId = id
      /* try {
        sessionStorage.setItem(customerIdCookieName, id)
      } catch (e) {
        console.log('Session storage blocked.')
      }*/
    }
  }

  static deleteCustomerId() {
    if (this.custidStoreMode === CustidStoreMode.cookie) {
      CookieService.delete(customerIdCookieName)
    } else {
      this.customerId = null
      /* try {
        sessionStorage.removeItem(customerIdCookieName)
      } catch (e) {
        console.log('Session storage blocked.')
      }
      if (CookieService.get(customerIdCookieName) !== null) {
        CookieService.delete(customerIdCookieName)
      }*/
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
    const customerId = this.customerId
    /* let customerId = null
    try {
      customerId = sessionStorage.getItem(customerIdCookieName)
    } catch (e) {
      console.log('Session storage blocked.')
    }*/
    if (customerId !== null) {
      UserService.saveCustomerId(customerId)
      /* try {
        sessionStorage.removeItem(customerIdCookieName)
      } catch (e) {
        console.log('Session storage blocked.')
      }*/
    }
  }

  static switchToSessionModeAfterConsentDismiss() {
    const customerId = CookieService.get(customerIdCookieName)
    UserService.deleteCustomerId()
    this.custidStoreMode = CustidStoreMode.session
    if (customerId !== null) {
      this.customerId = customerId
      /* try {
        sessionStorage.setItem(customerIdCookieName, customerId)
      } catch (e) {
        console.log('Session storage blocked.');
      }*/
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
        if (ga !== null) {
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
    /* try {
      sessionStorage.removeItem('ds-times-counter')
      sessionStorage.removeItem('ds-teaser-display')
    } catch (e) {
      console.log('Session storage blocked.')
    }*/
  }
}
