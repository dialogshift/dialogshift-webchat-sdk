import { HttpService } from './'
import { config } from '../config/config'
import { MixedObject } from '../types'

export class ApiService {
  private getTransport() {
    return HttpService
  }

  getEndpoint(): string {
    return (config as MixedObject).env.apiEndpoint
  }

  setContext(visitorId: string, key: string, value: any): Promise<Response> {
    const context = {}
    context[key] = value

    const data = {
      custid: visitorId,
      context: JSON.stringify(context),
    }

    return this.getTransport().postRequest(
      `${this.getEndpoint()}/config/context`,
      data,
    )
  }

  getContext(visitorId: string, variable: string): Promise<Response> {
    return this.getTransport()
      .getRequest(
        `${this.getEndpoint()}/config/context/${visitorId}/${variable}`,
      )
      .then(response => {
        return response[variable] ? response[variable] : null
      })
  }

  getConfig(clientId: string): Promise<Response> {
    return this.getTransport().getRequest(
      `${this.getEndpoint()}/config/webapp/${clientId}`,
    )
  }
}
