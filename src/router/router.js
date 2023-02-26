import {createRouter, createWebHistory} from "vue-router";

import MainPage from "../pages/MainPage.vue"
import ProductPage from "../pages/ProductPage.vue"
import OrderPage from "../pages/OrderPage.vue"

const routes = [
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/products',
        component: ProductPage
    },
    {
        path: '/orders',
        component: OrderPage
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;