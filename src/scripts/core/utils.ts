export const getUrlParam = (
  name: string,
  defaultReturn = null,
): string | null => {
  const url = new URL(location.href)
  const param = url.searchParams.get(name)

  if (param && param.length >= 1) {
    return param
  }

  return defaultReturn
}

export const isExternalUrl = (url): boolean => {
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

  document.querySelector('head').appendChild(style)
}
