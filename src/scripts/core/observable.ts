import { EventEmitter, EventHandler } from './event-emitter'

export interface ObservableEvent {
  type: string
  callback: EventHandler
  once?: boolean
}

export interface ObservableOptions {
  events?: ObservableEvent[]
}

export class Observable extends EventEmitter {
  constructor(options: ObservableOptions) {
    super()
    const events = options.events || []

    events.forEach(item => {
      if (item.once) {
        this.once(item.type, item.callback)
      } else {
        this.on(item.type, item.callback)
      }
    })
  }
}
