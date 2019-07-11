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

export const injectCss = (css: string) => {
  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = css

  const head = document.querySelector('head')

  if (head !== null) {
    head.appendChild(style)
  }
}

export const isObject = (item: any): boolean => {
  return item && typeof item === 'object' && !Array.isArray(item)
}

export const mergeDeep = <T, U>(target: T, source: U): (T & U) | ({} & T) => {
  const output = Object.assign({}, target)

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(key => {
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
