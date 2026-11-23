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

export const isLinkUrl = (
  url: string,
  base: string = window.location.href,
): boolean => {
  try {
    const protocol = new URL(url, base).protocol
    return (
      protocol === 'http:' ||
      protocol === 'https:' ||
      protocol === 'mailto:' ||
      protocol === 'tel:'
    )
  } catch (e) {
    return false
  }
}

// Formatting tags that stay in texts shown on the hotel website. They keep no attributes except href and target
// on links. Unknown tags are replaced by their content, the dropped tags are removed together with their content.
const sanitizeAllowedTags = [
  'a', 'b', 'br', 'div', 'em', 'i', 'li', 'ol', 'p', 's', 'small', 'span', 'strong', 'sub', 'sup', 'u', 'ul',
]
const sanitizeDroppedTags = [
  'embed', 'iframe', 'noscript', 'object', 'script', 'select', 'style', 'template', 'textarea', 'title',
]
const htmlNamespace = 'http://www.w3.org/1999/xhtml'
const elementNode = 1
const textNode = 3

const copySafeLinkAttributes = (source: Element, link: HTMLElement) => {
  const href = source.getAttribute('href')

  if (href === null || !isLinkUrl(href)) {
    return
  }

  link.setAttribute('href', href)

  if (source.getAttribute('target') === '_blank') {
    link.setAttribute('target', '_blank')
    link.setAttribute('rel', 'noopener')
  }
}

const appendSanitizedNodes = (source: Node, target: Node) => {
  for (let i = 0; i < source.childNodes.length; i++) {
    const node = source.childNodes[i]

    if (node.nodeType === textNode) {
      target.appendChild(document.createTextNode(node.nodeValue || ''))
    }

    if (node.nodeType !== elementNode) {
      continue
    }

    const element = node as Element
    const tag = element.localName

    if (
      element.namespaceURI !== htmlNamespace ||
      sanitizeDroppedTags.indexOf(tag) >= 0
    ) {
      continue
    }

    if (sanitizeAllowedTags.indexOf(tag) < 0) {
      appendSanitizedNodes(element, target)
      continue
    }

    const copy = document.createElement(tag)

    if (tag === 'a') {
      copySafeLinkAttributes(element, copy)
    }

    appendSanitizedNodes(element, copy)
    target.appendChild(copy)
  }
}

/**
 * Builds new DOM nodes from HTML with only formatting tags and links, so the result can not run script on the
 * page. The HTML is parsed in an inert document and never serialized again.
 *
 * @param html Text with HTML from the chat configuration, the chat or the website.
 * @returns Nodes to append to the page.
 */
export const sanitizeHtml = (html: string): DocumentFragment => {
  const parsed = new DOMParser().parseFromString(html, 'text/html')
  const fragment = document.createDocumentFragment()

  appendSanitizedNodes(parsed.body, fragment)

  return fragment
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
