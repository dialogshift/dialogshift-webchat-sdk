import { BaseWidgetOptions, BaseWidget } from '../core/base-widget'
import { config } from '../config/config'

interface ChatboxWidgetOptions extends BaseWidgetOptions {
  hasExtendedWidth: boolean
}

type ChatboxWidgetState = 'loading' | 'ready'

export class ChatboxWidget extends BaseWidget {
  private hasExtendedWidth = false

  constructor(options: ChatboxWidgetOptions) {
    super(options)

    this.setState('loading')

    if (options.hasExtendedWidth) {
      this.hasExtendedWidth = true
      this.getBoxElem().classList.add(config.chatHasExtendedWidth)
    }

    this.on('before:show', () => document.body.classList.add(config.chatIsOpen))
    this.on('before:hide', () =>
      document.body.classList.remove(config.chatIsOpen),
    )
  }

  protected showNode() {
    const boxElem = this.getBoxElem()

    boxElem.style.zIndex = '30'
    boxElem.style.visibility = 'visible'

    setTimeout(() => {
      boxElem.style.opacity = '1'
      boxElem.style.transform = 'translateY(0)'
    })
  }

  protected hideNode() {
    const boxElem = this.getBoxElem()
    boxElem.style.opacity = '0'
    boxElem.style.transform = 'translateY(10px)'

    setTimeout(() => {
      boxElem.style.zIndex = '-1'
      boxElem.style.visibility = 'hidden'
    }, 100)
  }

  getBaseCls(): string {
    return config.chatCls
  }

  setState(state: ChatboxWidgetState) {
    if (state === 'loading') {
      this.getBoxElem().classList.add(config.chatLoadingCls)
    }

    if (state === 'ready') {
      this.getBoxElem().classList.remove(config.chatLoadingCls)
    }
  }

  renderLoader(): HTMLElement {
    const loaderAnimation =
      '<svg xmlns="http://www.w3.org/2000/svg" width="64px" height="64px" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid"><g transform="rotate(0 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#6a6a6a"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.9166666666666666s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(30 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#6a6a6a"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.8333333333333334s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(60 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#6a6a6a"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.75s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(90 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#6a6a6a"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.6666666666666666s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(120 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#6a6a6a"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5833333333333334s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(150 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#6a6a6a"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.5s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(180 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#6a6a6a"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.4166666666666667s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(210 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#6a6a6a"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.3333333333333333s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(240 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#6a6a6a"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.25s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(270 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#6a6a6a"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.16666666666666666s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(300 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#6a6a6a"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="-0.08333333333333333s" repeatCount="indefinite"></animate></rect></g><g transform="rotate(330 50 50)"><rect x="47" y="24" rx="3" ry="6" width="6" height="12" fill="#6a6a6a"><animate attributeName="opacity" values="1;0" keyTimes="0;1" dur="1s" begin="0s" repeatCount="indefinite"></animate></rect></g></svg>'
    const loader = document.createElement('div')
    loader.classList.add(config.chatLoaderCls)

    const loaderImage = document.createElement('div')
    loaderImage.classList.add(config.chatLoaderImageCls)
    loaderImage.innerHTML = loaderAnimation

    loader.appendChild(loaderImage)

    return loader
  }

  render(renderTo?: HTMLElement) {
    const boxElem = this.getBoxElem()
    boxElem.classList.add(config.chatCls)
    boxElem.appendChild(this.renderLoader())

    super.render(renderTo)
  }
}
