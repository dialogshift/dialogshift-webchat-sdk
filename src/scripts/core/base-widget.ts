import { Observable, ObservableOptions } from './observable'
import { AudioSound, AudioService } from '../services/audio.service'

export const config = {
  rootCls: 'ds-widget',
  visibleCls: 'ds-widget--visible',
  fxCls: {
    fade: 'ds-widget-fx--fade',
    zoom: 'ds-widget-fx--zoom',
    fadeBottom: 'ds-widget-fx--fade-bottom',
    bounceInRight: 'ds-widget-fx--bounce-in-right',
    pulse: 'ds-widget-fx--pulse',
    bounce: 'ds-widget-fx--bounce',
  },
}

export interface BaseWidgetEffectsOptions {
  appear?: 'fade' | 'fadeBottom' | 'zoom' | 'bounceInRight' | null
  delay?: number
  sound?: AudioSound
  attention?: 'pulse' | 'bounce' | null
  attentionInterval?: number
}

export interface BaseWidgetOptions extends ObservableOptions {
  visible?: boolean
  baseCls?: string
  renderTo?: HTMLElement
  animationDelay?: number
  content?: string | number
  effects?: BaseWidgetEffectsOptions
}

export type BaseWidgetDisplayMode = 'block' | 'flex'

export class BaseWidget extends Observable {
  private baseCls = ''
  private renderTo: HTMLElement
  private boxElem: HTMLElement
  private contentElem: HTMLElement
  private content: string | number
  private destroyed = false
  private displayMode: BaseWidgetDisplayMode = 'block'
  private effects: BaseWidgetEffectsOptions = {
    appear: null,
    delay: 0,
    attention: null,
    attentionInterval: 0,
  }
  private attentionInterval: any = null
  protected visible = true
  protected animationDelay = 250

  constructor(options: BaseWidgetOptions) {
    super({ events: options.events })

    if (!options.effects) {
      delete options.effects
    }

    Object.assign(this, options)

    if (this.renderTo) {
      this.render()
    }
  }

  protected showNode() {
    const boxElem = this.getBoxElem()
    boxElem.style.display = this.getDisplayMode()

    if (this.effects.appear) {
      this.showAnimateNode(boxElem)
    } else {
      setTimeout(() => {
        boxElem.classList.add(config.visibleCls)
        if (this.effects.sound) {
          AudioService.playSound(this.effects.sound)
        }
      }, 10)
    }

    if (this.effects.attention && this.effects.attentionInterval) {
      setTimeout(() => {
        this.startAtention()
      }, this.effects.delay)
    }
  }

  protected startAtention() {
    this.attentionInterval = setInterval(() => {
      const boxElem = this.getBoxElem()

      const handler = () => {
        boxElem.removeEventListener('animationend', handler)
        boxElem.classList.remove(config.fxCls[this.effects.attention])
      }
      boxElem.addEventListener('animationend', handler)

      boxElem.classList.add(config.fxCls[this.effects.attention])
    }, this.effects.attentionInterval)
  }

  protected stopAtention() {
    this.attentionInterval && clearInterval(this.attentionInterval)
    const boxElem = this.getBoxElem()
    boxElem.classList.remove(config.fxCls[this.effects.attention])
  }

  protected hideNode() {
    const boxElem = this.getBoxElem()

    if (this.effects.attention && this.effects.attentionInterval) {
      this.stopAtention()
    }

    boxElem.classList.remove(config.visibleCls)

    if (this.effects.appear) {
      this.hideAnimateNode(boxElem)
    }

    setTimeout(() => {
      boxElem.style.display = 'none'
    }, this.animationDelay)
  }

  protected showAnimateNode(boxElem: HTMLElement) {
    setTimeout(() => {
      const handler = () => {
        boxElem.removeEventListener('animationend', handler)
        boxElem.classList.add(config.visibleCls)
        boxElem.classList.remove(config.fxCls[this.effects.appear])
      }

      boxElem.addEventListener('animationend', handler)

      boxElem.classList.add(config.fxCls[this.effects.appear])

      if (this.effects.sound) {
        AudioService.playSound(this.effects.sound)
      }
    }, this.effects.delay)
  }

  protected hideAnimateNode(boxElem: HTMLElement) {
    boxElem.style.removeProperty('animationDelay')
    boxElem.classList.remove(config.fxCls[this.effects.appear])
  }

  isDestroyed(): boolean {
    return this.destroyed
  }

  isVisible(): boolean {
    return this.visible
  }

  getDisplayMode(): BaseWidgetDisplayMode {
    return this.displayMode
  }

  getBaseCls(): string | string[] {
    return this.baseCls
  }

  createNode(): HTMLElement {
    return document.createElement('div')
  }

  getBoxElem(): HTMLElement {
    if (!this.boxElem) {
      this.boxElem = this.createNode()
      const baseCls = this.getBaseCls()
      let classes = [config.rootCls]

      if (typeof baseCls === 'string') {
        classes = [
          ...classes,
          ...(baseCls.indexOf(' ') < 0
            ? [baseCls]
            : baseCls.replace(/^\s+|\s+$/g, '').split(/\s+/)),
        ]
      } else {
        classes = [...classes, ...baseCls]
      }

      classes.forEach((item: string) => this.boxElem.classList.add(item))
    }

    return this.boxElem
  }

  getContentElem(): HTMLElement {
    if (!this.contentElem) {
      this.contentElem = this.createNode()

      if (this.getBaseCls()) {
        this.contentElem.classList.add(`${this.getBaseCls()}__content`)
      }

      this.getBoxElem().appendChild(this.contentElem)
    }

    return this.contentElem
  }

  render(renderTo?: HTMLElement) {
    if (!renderTo && !this.renderTo) {
      throw Error('Please provide parent node to render widget')
    }

    if (this.isRendered()) {
      return
    }

    let renderToNode = this.renderTo
    if (renderTo) {
      renderToNode = renderTo
    }

    this.fire('before:render')

    const boxElem = this.getBoxElem()

    if (!this.visible) {
      this.hideNode()
    }

    if (this.content) {
      this.setContent(this.content)
    }

    renderToNode.appendChild(boxElem)

    this.fire('render')

    if (this.visible) {
      this.visible = false
      this.show()
    }
  }

  isRendered(): boolean {
    return this.boxElem && document.body.contains(this.boxElem)
  }

  show() {
    if (this.isVisible()) {
      return
    }

    this.fire('before:show')
    this.visible = true

    this.showNode()

    setTimeout(() => this.fire('show'), this.animationDelay)
  }

  hide() {
    if (!this.isVisible()) {
      return
    }

    this.fire('before:hide')
    this.visible = false

    this.hideNode()

    setTimeout(() => this.fire('hide'), this.animationDelay)
  }

  addCls(cls: string) {
    this.getBoxElem().classList.add(cls)
  }

  removeCls(cls: string) {
    this.getBoxElem().classList.remove(cls)
  }

  setContent(content: string | number, safe = false) {
    this.content = content

    if (safe) {
      this.getContentElem().innerText = content.toString()
    } else {
      this.getContentElem().innerHTML = content.toString()
    }
  }

  destroy() {
    super.destroy()

    const contentElem = this.getContentElem()

    if (contentElem && contentElem.parentNode) {
      contentElem.parentNode.removeChild(contentElem)
    }
    this.contentElem = null

    const boxElem = this.getBoxElem()

    if (boxElem && boxElem.parentNode) {
      boxElem.parentNode.removeChild(boxElem)
    }
    this.boxElem = null

    this.destroyed = true

    this.fire('destroy')
  }
}
