import store from '../store'
import {REPLACE} from '../store/mutation-types'
import URL from '../constants/baseUrl'
import {getCookies, removeCookies} from './utils'
import router from '../router'
import ElementUI from 'element-ui'

/**
 * getTableList
 * @param api
 * @param key
 * @return {Promise<void>}
 */
export function getList (api, key) {
  store.dispatch(REPLACE, {loading: true})
  store.dispatch(REPLACE, {tableData: []})
  request(api, key).then(
    (res) => {
      store.dispatch(REPLACE, {tableData: res})
      store.dispatch(REPLACE, {loading: false})
    }
  )
}
/**
 * 请求接口
 * @param api
 * @param key
 * @param option
 * @return {Promise<any>}
 */
export const request = (api, key = null, option = null) => {
  const cookie = getCookies('Access-Token')
  return new Promise((resolve, reject) => {
    fetch(URL.baseUrl + api, {
      ...option,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Token': cookie
      }
    }).then(
      (response) => {
        switch (response.status) {
          case 200:
            return response.json()
          case 401:
            store.dispatch(REPLACE, {login: false}).then(
              () => {
                ElementUI.Message({
                  type: 'error',
                  message: '登录超时，正在为您跳转登录页面！',
                  duration: 1500,
                  onClose: () => {
                    removeCookies('Access-Token')
                    router.push('/login')
                  }
                })
              }
            )
            break
          default:
            ElementUI.Message({
              type: 'error',
              message: '服务器错误！',
              duration: 1500
            })
        }
      }
    ).then(
      (res) => {
        if (res.Status) {
          if (key) {
            resolve(res[key])
          } else {
            resolve(res)
          }
        } else {
          reject(res)
        }
      }
    ).catch(
      (err) => {
        reject(err)
      }
    )
  })
}
