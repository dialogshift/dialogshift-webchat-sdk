import { HttpService } from './'
import { config } from '../config/config'
import { MixedObject } from '../types'

export class ApiService {
  static getTransport() {
    return HttpService
  }

  static getEndpoint(): string {
    return (config as MixedObject).env.apiEndpoint
  }

  static setContext(
    customerId: string,
    key: string,
    value: any,
  ): Promise<MixedObject | Error> {
    const context = {}
    context[key] = value

    const data = {
      custid: customerId,
      context: JSON.stringify(context),
    }

    return ApiService.getTransport().postRequest(
      `${ApiService.getEndpoint()}/config/context`,
      data,
    )
  }

  static getContext(
    customerId: string,
    variable: string,
  ): Promise<MixedObject> {
    return ApiService.getTransport()
      .getRequest(
        `${ApiService.getEndpoint()}/config/context/${customerId}/${variable}`,
      )
      .then((response: any) => {
        return response[variable] ? response[variable] : null
      })
  }

  static getConfig(
    clientId: string,
    customerId = 'none',
  ): Promise<MixedObject> {
    return ApiService.getTransport().getRequest(
      `${ApiService.getEndpoint()}/config/webapp/${clientId}/${customerId}`,
    )
  }

  static createUser(options: {
    clientId: string
    source: string
    locale: string
    csrfToken?: string
    context?: MixedObject
  }): Promise<MixedObject | Error> {
    let url = `${ApiService.getEndpoint()}/customer/v2/createnew/${
      options.source
    }/${options.clientId}/${options.locale}`

    if (options.csrfToken) {
      url += `?csrftoken=${options.csrfToken}`
    }

    if (options.context) {
      options.csrfToken ? (url += '&') : (url += '?')
      url += `context=${encodeURIComponent(JSON.stringify(options.context))}`
    }

    return ApiService.getTransport().getRequest(url)
  }

  static validateUser(options: {
    clientId: string
    currentUserId: string
    currentURL: string
  }): Promise<MixedObject> {
    return ApiService.getTransport().postRequest(
      `${ApiService.getEndpoint()}/customer/validate`,
      {
        currentURL: options.currentURL,
        clientid: options.clientId,
        custid: options.currentUserId,
      },
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
      `${ApiService.getEndpoint()}/customer/csrf`,
      data,
    )
  }
}
