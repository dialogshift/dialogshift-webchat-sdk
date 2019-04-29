export function getUrlParam(name: string, defaultReturn = null): string | null {
  const url = new URL(location.href)
  const param = url.searchParams.get(name)

  if (param && param.length >= 1) {
    return param
  }

  return defaultReturn
}
