import { HttpService } from './http.service'
import { config } from '../config/config'
import { MixedObject } from '../types'

export class ApiService {
  static getTransport() {
    return HttpService
  }

  static getCoreEndpoint(): string {
    return (config as MixedObject).env.coreApiEndpoint
  }

  static getIbeEndpoint(): string {
    return (config as MixedObject).env.ibeApiEndpoint
  }

  static setContext(
    customerId: string,
    key: string,
    value: string | number,
  ): Promise<MixedObject | Error> {
    const context = {}
    context[key] = value

    const data = {
      custid: customerId,
      context: JSON.stringify(context),
    }

    return ApiService.getTransport().postRequest(
      `${ApiService.getCoreEndpoint()}/config/context`,
      data,
    )
  }

  static getContext(
    customerId: string,
    variable: string,
  ): Promise<MixedObject> {
    return ApiService.getTransport()
      .getRequest(
        `${ApiService.getCoreEndpoint()}/config/context/${customerId}/${variable}`,
      )
      .then((response: MixedObject) => {
        return response[variable] ? response[variable] : null
      })
  }

  static getConfig(
    clientId: string,
    customerId = 'none',
    channel?: string,
  ): Promise<MixedObject> {
    let url = `${ApiService.getCoreEndpoint()}/config/webapp/${clientId}/${customerId}`

    if (channel) {
      url += `?channel=${channel}`
    }

    return ApiService.getTransport().getRequest(url)
  }

  static createUser(options: {
    clientId: string
    source: string
    locale: string
    csrfToken?: string
    context?: MixedObject
    debug?: string
  }): Promise<MixedObject | Error> {
    let url = `${ApiService.getCoreEndpoint()}/customer/v2/createnew/${
      options.source
    }/${options.clientId}/${options.locale}`

    if (options.csrfToken) {
      url += `?csrftoken=${options.csrfToken}`
    }

    if (options.context) {
      options.csrfToken ? (url += '&') : (url += '?')
      url += `context=${encodeURIComponent(JSON.stringify(options.context))}`
    }

    url.indexOf('?') === -1 ? (url += '?origin=sdk') : (url += '&origin=sdk')

    url += '&v=2.3.15'

    if (options.debug) {
      url += `&debug=${options.debug}`
    }

    return ApiService.getTransport().getRequest(url)
  }

  static validateUser(options: {
    clientId: string
    customerId: string
    currentURL: string
    context?: MixedObject
  }): Promise<MixedObject> {
    const data: { [key: string]: any } = {
      currentURL: options.currentURL,
      clientid: options.clientId,
      custid: options.customerId,
    }

    if (options.context) {
      data.context = JSON.stringify(options.context)
    }

    return ApiService.getTransport().postRequest(
      `${ApiService.getCoreEndpoint()}/customer/validate`,
      data,
    )
  }

  static createToken(options: {
    clientId: string
    realUserScore: number
    csrftoken?: string
    sec?: string
  }): Promise<MixedObject> {
    const data: MixedObject = {
      clid: options.clientId,
      sec: options.sec,
      realUserScore: options.realUserScore,
    }

    if (options.csrftoken) {
      data.csrftoken = options.csrftoken
    }

    return ApiService.getTransport().getRequest(
      `${ApiService.getCoreEndpoint()}/customer/csrf`,
      data,
    )
  }

  static getWhatsappLink(
    clientid: string,
    custid: string,
  ): Promise<MixedObject> {
    return ApiService.getTransport().getRequest(
      `${ApiService.getIbeEndpoint()}/whatsapp/onboard`,
      {
        clientid,
        custid,
      },
    )
  }
}
