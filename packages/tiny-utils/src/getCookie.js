function parseCookies(headers) {
  const cookieHeader = headers?.cookie
  let rx = /([^;=\s]*)=([^;]*)/g
  let obj = {}
  for (let m; (m = rx.exec(cookieHeader)); ) obj[m[1]] = decodeURIComponent(m[2])
  return obj
}

export function getCookie(name, headers) {
  if (typeof document !== 'undefined') {
    const re = new RegExp('(?:^|;)\\s?' + name + '=(.*?)(?:;|$)', 'i')
    const match = document.cookie.match(re)
    if (match && match[1]) return match[1]
    return ''
  }
  const cookies = parseCookies(headers)
  return cookies?.[name]
}
