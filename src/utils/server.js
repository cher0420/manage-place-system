import store from '../store'
import {REPLACE} from '../store/mutation-types'

export async function getMenus (v) {
  fetch('http://www.byxxhome.com:8081/menu').then(response => response.json()).then((res) => {
    store.dispatch(REPLACE, {menu: res})
    return res
  }).catch((error) => {
    return null
  })
}
