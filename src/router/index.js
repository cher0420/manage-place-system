import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/Layout'

Vue.use(Router)

const constantRouterMap = [
  { path: '/login', component: () => import('../views/login/Login'), hidden: true },
  { path: '/404', redirect: '/field/index', component: () => import('../views/field/index'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/field/index',
    name: 'index',
    children: [{
      path: 'index',
      name: 'index',
      component: () => import('../views/field/index')
    }]
  },
  {
    path: '/field',
    component: Layout,
    name: 'field',
    children: [{
      path: 'index',
      name: 'field',
      component: () => import('../views/field/index')
    },
    {
      path: 'create',
      name: 'field',
      component: () => import('../views/field/edit')
    },
    {
      path: 'edit',
      name: 'field',
      component: () => import('../views/field/edit')
    }]
  },
  {
    path: '/bot',
    component: Layout,
    name: 'bot',
    children: [
      {
        path: 'index',
        name: 'bot',
        component: () => import('../views/robot/index')
      },
      {
        path: 'create',
        name: 'bot',
        component: () => import('../views/robot/edit')
      },
      {
        path: 'edit',
        name: 'bot',
        component: () => import('../views/robot/edit')
      }
    ]
  },
  {
    path: '/article',
    component: Layout,
    name: 'article',
    children: [
      {
        path: 'index',
        name: 'article',
        component: () => import('../views/article/index')
      },
      {
        path: 'create',
        name: 'article',
        component: () => import('../views/article/edit')
      },
      {
        path: 'edit',
        name: 'article',
        component: () => import('../views/article/edit')
      }
    ]
  },
  {
    path: '/menu',
    component: Layout,
    name: 'menu',
    children: [
      {
        path: 'index',
        name: 'menu',
        component: () => import('../views/menu/index')
      },
      {
        path: 'create',
        name: 'menu',
        component: () => import('../views/menu/edit')
      },
      {
        path: 'edit',
        name: 'menu',
        component: () => import('../views/menu/edit')
      }
    ]
  },
  {
    path: '/articleCategory',
    component: Layout,
    name: 'articleCategory',
    children: [
      {
        path: 'index',
        name: 'articleCategory',
        component: () => import('../views/articleCategory/index')
      },
      {
        path: 'create',
        name: 'articleCategory',
        component: () => import('../views/articleCategory/edit')
      },
      {
        path: 'edit',
        name: 'articleCategory',
        component: () => import('../views/articleCategory/edit')
      }
    ]
  }
]
export default new Router({
  routes: constantRouterMap
})
