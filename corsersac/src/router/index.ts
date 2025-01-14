import { createRouter, createWebHistory } from 'vue-router'

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
    }
  ],
})

export default router
