export const parseUrlParam = (
  source: string,
  name: string,
  defaultReturn: string | null = null,
): string | null => {
  const url = new URL(source)
  const param = url.searchParams.get(name)

  if (param && param.length >= 1) {
    return param
  }

  return defaultReturn
}

export const isExternalUrl = (url: string): boolean => {
  const match = url.match(
    /^([^:\/?#]+:)?(?:\/\/([^\/?#]*))?([^?#]+)?(\?[^#]*)?(#.*)?/,
  )
  if (
    match != null &&
    typeof match[1] === 'string' &&
    match[1].length > 0 &&
    match[1].toLowerCase() !== location.protocol
  ) {
    return true
  }

  if (
    match != null &&
    typeof match[2] === 'string' &&
    match[2].length > 0 &&
    match[2].replace(
      new RegExp(
        `:( + { 'http:': 80, 'https:': 443 }[${location.protocol}] + )?$`,
      ),
      '',
    ) !== location.host
  ) {
    return true
  }

  return false
}

// Texts from the chat configuration are shown as text, only line breaks and bold text are kept
const textFormattingTags = ['BR', 'STRONG']

const copyFormattedText = (source: Node, target: Node) => {
  for (let i = 0; i < source.childNodes.length; i++) {
    const child = source.childNodes[i]

    if (child.nodeType === Node.TEXT_NODE) {
      target.appendChild(document.createTextNode(child.nodeValue || ''))
    } else if (child.nodeType === Node.ELEMENT_NODE) {
      const tagName = (child as Element).tagName

      if (textFormattingTags.indexOf(tagName) === -1) {
        // other tags are removed, their text is kept
        copyFormattedText(child, target)
      } else {
        // a new element, so no attribute is copied
        const elem = document.createElement(tagName.toLowerCase())
        copyFormattedText(child, elem)
        target.appendChild(elem)
      }
    }
  }
}

// DOMParser builds an inert document that runs no script and loads nothing, it also decodes entities like &amp;
export const setTextWithFormatting = (elem: HTMLElement, text: string) => {
  const parsed = new DOMParser().parseFromString(text, 'text/html')
  elem.textContent = ''
  copyFormattedText(parsed.body, elem)
}

export const isHttpUrl = (
  url: string,
  base: string = window.location.href,
): boolean => {
  try {
    const protocol = new URL(url, base).protocol
    return protocol === 'http:' || protocol === 'https:'
  } catch (e) {
    return false
  }
}

export const injectCss = (css: string) => {
  const style = document.createElement('style')
  const head = document.querySelector('head')

  style.type = 'text/css'
  style.innerHTML = css

  if (head !== null) {
    head.appendChild(style)
  }
}

export const isFontLoaded = (fontName: string): boolean => {
  let canvas: HTMLCanvasElement | null = document.createElement('canvas')
  const context = canvas.getContext('2d')
  const text = 'abcdefghijklmnopqrstuvwxyz0123456789'

  if (context === null) {
    return false;
  }

  context.font = '72px monospace'

  const baselineSize = context.measureText(text).width

  context.font = `72px ${fontName}, monospace`

  const newSize = context.measureText(text).width

  canvas = null

  return newSize !== baselineSize;
}

export const loadOpenSans = () => {}

export const isObject = (item: any): boolean => {
  return item && typeof item === 'object' && !Array.isArray(item)
}

export const mergeDeep = <T extends object, U>(target: T, source: U): (T & U) | ({} & T) => {
  const output = Object.assign({}, target)

  if (isObject(target) && isObject(source)) {
    // @ts-ignore
    Object.keys(source).forEach((key: any) => {
      if (isObject(source[key])) {
        if (!(key in target)) Object.assign(output, { [key]: source[key] })
        else output[key] = mergeDeep(target[key], source[key])
      } else {
        Object.assign(output, { [key]: source[key] })
      }
    })
  }

  return output
}

export const removeURLParameters = (removeParams: string[]) => {
  const deleteRegex = new RegExp(`${removeParams.join('=|')}=`)

  const params = location.search.slice(1).split('&')
  const search: string[] = []

  for (let i = 0; i < params.length; i++) {
    if (!deleteRegex.test(params[i])) {
      search.push(params[i])
    }
  }

  const searchString = search.length ? `?${search.join('&')}` : ''
  const redirectUrl = `${location.pathname}${searchString}${location.hash}`

  window.history.replaceState({}, document.title, redirectUrl)
}

export const isCrawler = (): boolean => {
  return /bot|google|baidu|bing|msn|teoma|slurp|yandex/i.test(
    navigator.userAgent,
  )
}

export const inIframe = (): boolean => {
  try {
    return window.self !== window.top
  } catch (e) {
    return true
  }
}
