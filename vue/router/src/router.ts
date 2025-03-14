import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from './views/HomeView.vue'
import AboutView from './views/AboutView.vue'
import ProductsView from './views/ProductsView.vue'
import ProductView from './views/ProductView.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: HomeView },
    { path: '/about', component: AboutView },
    { path: '/products', component: ProductsView },
    { path: '/products/:id', component: ProductView },
    { path: '/:pathMatch(.*)*', redirect: '/' }
  ],
})

export default router
