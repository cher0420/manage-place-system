
// 查看是否有cookies
// 有cookies,从cookies拿值
// 无cookies,用户输入
import router from '../router'
const whiteList = ['/login'] // 不重定向白名单
import store from '../store'

router.beforeEach((to, from, next) => {
  const loginStatus = store.state.app.login
  if (loginStatus) {
    if (to.path === '/login') {
      next({ path: '/field/index' })
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next('/login')
    }
  }
})
