import { createFacade } from './core/facade'
import { App, AppOptions } from './core/app'

let facade = null
const instance = (options?: AppOptions) => {
  console.log(window)
  if (facade && !facade.isDestroyed()) {
    return facade
  }

  facade = createFacade(new App(options))
  return facade
}

export { instance }
