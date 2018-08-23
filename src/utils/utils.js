import Cookies from 'js-cookie'

/**
 * 设置cookies
 * @param key
 * @return {string}
 * @param value
 * @return {string}
 * @param option
 * @return {object}
 */
export async function setCookies (key, value, option = null) {
  return Cookies.set(key, value, option)
}

/**
 * 获取cookie
 * @param key
 * @return {string}
 */
export function getCookies (key) {
  return Cookies.get(key)
}

/**
 *
 * @param keyArr
 * @return {Array}
 */
export async function removeCookies (keyArr) {
  if (keyArr instanceof Array) {
    for (let v of keyArr) {
      Cookies.remove(v)
    }
  } else {
    Cookies.remove(keyArr)
  }
}

export function unhtml (str) {
  return str ? str.replace(/[<">']/g, (a) => {
    return {
      '<': '&lt;',
      '"': '&quot;',
      '>': '&gt;',
      "'": '&#39;'
    }[a]
  }) : ''
}
export function htmlDecodeByRegExp (str) {
  let s = ''
  if (str.length === 0) return ''
  s = str.replace(/&amp;/g, '&')
  s = s.replace(/&lt;/g, '<')
  s = s.replace(/&gt;/g, '>')
  s = s.replace(/&nbsp;/g, ' ')
  s = s.replace(/&#39;/g, "\'")
  s = s.replace(/&quot;/g, '"')
  return s
}
