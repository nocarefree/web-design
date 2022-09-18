import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('../components/polaris/Index.vue'),
      children:[
        {
          path: '/',
          component: () => import('../components/polaris/HomeView.vue')
        },  
        {
          path: '/orders',
          component: () => import('../components/polaris/OrdersView.vue')
        },        
      ]
    },
    {
      path: '/:pathMatch(.*)*',
      component: () => import('../components/polaris/Index.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
