import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('@/views/Login') },
  {
    path: '/home',
    component: () => import('@/views/Home'),
    children: [
      { path: '/users', component: () => import('@/views/User') },
      { path: '/permission', component: () => import('@/views/Permission') },
      { path: '/rights', component: () => import('@/views/Permission/Rights.vue') },
      { path: '/orders', component: () => import('@/views/Orders') },
      {
        path: '/manager',
        component: () => import('@/views/Manager'),
        children: [
          { path: 'list', component: () => import('@/views/Manager/components/list.vue') },
          { path: 'value', component: () => import('@/views/Manager/components/value.vue') },
          { path: 'sort', component: () => import('@/views/Manager/components/sort.vue') },
          { path: 'add', component: () => import('@/views/Manager/components/add.vue') }
        ]
      }

    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
