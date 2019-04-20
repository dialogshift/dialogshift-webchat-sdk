import { createFacade } from './core/facade'
import { App, AppOptions } from './core/app'

let facade = null
const instance = (options?: AppOptions) => {
  if (facade) {
    return facade
  }

  facade = createFacade(new App(options))
  return facade
}

export { instance }
