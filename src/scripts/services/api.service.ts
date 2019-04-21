import { HttpService } from './'
import { config } from '../config/config'

export class ApiService {
  private getTransport() {
    return HttpService
  }

  getEndpoint(): string {
    return config.apiEndpoint
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
    return this.getTransport().getRequest(
      `${this.getEndpoint()}/config/context/${visitorId}/${variable}`,
    )
  }
}
