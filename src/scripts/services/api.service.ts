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
    visitorId: string,
    key: string,
    value: any
  ): Promise<Response> {
    const context = {}
    context[key] = value

    const data = {
      custid: visitorId,
      context: JSON.stringify(context),
    }

    return ApiService.getTransport().postRequest(
      `${ApiService.getEndpoint()}/config/context`,
      data
    )
  }

  static getContext(visitorId: string, variable: string): Promise<Response> {
    return ApiService.getTransport()
      .getRequest(
        `${ApiService.getEndpoint()}/config/context/${visitorId}/${variable}`
      )
      .then((response: any) => {
        return response[variable] ? response[variable] : null
      })
  }

  static getConfig(clientId: string, customerId = 'none'): Promise<Response> {
    return ApiService.getTransport().getRequest(
      `${ApiService.getEndpoint()}/config/webapp/${clientId}/${customerId}`
    )
  }

  static createUser(options: {
    clientId: string
    source: string
    locale: string
  }): Promise<Response> {
    return ApiService.getTransport().getRequest(
      `${ApiService.getEndpoint()}/customer/v2/createnew/${options.source}/${
        options.clientId
      }/${options.locale}`
    )
  }

  static validateUser(options: {
    clientId: string
    currentUserId: string
    currentURL: string
  }) {
    return ApiService.getTransport().postRequest(
      `${ApiService.getEndpoint()}/customer/validate`,
      {
        currentURL: options.currentURL,
        clientid: options.clientId,
        custid: options.currentUserId,
      }
    )
  }
}
