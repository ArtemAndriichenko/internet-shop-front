import {createRouter, createWebHistory} from "vue-router";

import MainPage from "../pages/MainPage.vue"
import ProductPage from "../pages/ProductPage.vue"
import OrderPage from "../pages/OrderPage.vue"
import AuthPage from "../pages/AuthPage.vue"
import RegistPage from "../pages/RegistPage.vue"
import CartPage from "../pages/CartPage.vue"
import CartItemPage from "../pages/CartItemPage.vue"
import OrderItemPage from "../pages/OrderItemPage.vue"
import ProductByPricePage from "../pages/ProductByPricePage.vue"

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
    },
    {
        path: '/auth',
        component: AuthPage
    },
    {
        path: '/regist',
        component: RegistPage
    },
    {
        path: '/carts',
        component: CartPage
    },
    {
        path: '/carts/items',
        component: CartItemPage
    },
    {
        path: '/orders/items',
        component: OrderItemPage
    },
    {
        path: '/products/price',
        component: ProductByPricePage
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;