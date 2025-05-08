import { createFacade } from './core/facade'
import { App, AppOptions } from './core/app'

let facade: any = null
const instance = (options?: AppOptions) => {
  if (facade && !facade.isDestroyed()) {
    return facade
  }

  facade = createFacade(new App(options as AppOptions))
  return facade
}

export { instance }
