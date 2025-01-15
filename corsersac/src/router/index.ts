import { createRouter, createWebHistory } from 'vue-router'
import {UtilManager} from "@/utils/utilManager.ts";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path : '/',
      name: 'auth',
      component: () => import('../views/the-auth-page.view.vue')
    },
    {
      path: '/sign-up',
      name: 'sign-up',
      component: () => import('../views/the-register-page.view.vue')
    },
    {
      path: '/recover-password',
      name: 'recover-password',
      component: () => import('../views/the-recover-password-page.view.vue')
    },
    {
      path:'/confirm-password',
        name: 'confirm-password',
        component: () => import('../views/the-confirm-password-page.view.vue')
    },
    {
        path:'/invoice-options',
        name: 'invoice-options-page',
        component: () => import('../views/the-invoice-options-page.view.vue')
    },
    {
      path:'/usage-options',
        name: 'usage-options-page',
        component: () => import('../views/the-usage-options-page.view.vue')
    },
      {
          path:'/invoice-search-date',
          name: 'invoice-search-date-page',
          component: () => import('../views/the-invoice-search-date.view.vue')
      },
      {
            path: '/invoice-range-date',
            name: 'invoice-range-date-page',
            component: () => import('../views/the-invoice-range-date.view.vue')
      },
      {
          path: '/invoice-search-serie',
          name: 'invoice-search-serie-page',
          component: () => import('../views/the-invoice-search-serie.view.vue')
      }
  ],
})

router.beforeEach((to, from, next) => {
   const token = UtilManager.instance.getCookies("Token");
    if (token && (to.name == "auth" || to.name == "sign-up" || to.name == "recover-password" || to.name == "confirm-password")) {
        next({ name: 'invoice-options-page' })
    }
    else if (!token && to.name !== "auth" && to.name !== "sign-up" && to.name !== "recover-password" && to.name !== "confirm-password") {
        next({ name: 'auth' });
    }
    else{
        next()
    }
})

export default router
