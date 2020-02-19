import { MixedObject } from '../types'

export class HttpService {
  private static processError(response): Promise<any> {
    if (response.status >= 200 && response.status < 300) {
      return Promise.resolve(response)
    }

    return Promise.reject(new Error(response.statusText))
  }

  private static processJson(response) {
    return response.json()
  }

  static getRequest(url: string): Promise<Response> {
    return fetch(url)
      .then(this.processError)
      .then(this.processJson)
  }

  static postRequest(url: string, data: MixedObject = {}): Promise<Response> {
    return fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(data),
    }).then(this.processError)
  }
}
