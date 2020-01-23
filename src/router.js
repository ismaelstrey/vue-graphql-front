import Vue from 'vue'
import Router from 'vue-router'
import authRoutes from '@/modules/auth/router'
import dashBoardRoutes from '@/modules/dashboard/router'
import {
  AUTH_TOKEN
} from '@/plugins/apollo'
import AuthService from '@/modules/auth/services/auth-service'
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    ...authRoutes,
    ...dashBoardRoutes,
    {
      path: '',
      redirect: '/login'
    }

  ]
})

router.beforeEach(async (to, from, next) => {
  if (to.matched.some(route => route.meta.requiriesAuth)) {
    const token = window.localStorage.getItem(AUTH_TOKEN)
    const loginRoute = {
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    }
    if (token) {
      try {
        await AuthService.user({
          fetchPolice: 'network-only'
        })
        return next()
      } catch (error) {
        console.log('Auto Login Error: ', error)
        return next(loginRoute)
      }
    }
    return next(loginRoute)
  }
  next()
})
export default router
