import {createRouter, createWebHistory} from "vue-router";

import MainPage from "../pages/MainPage.vue"
import AdminProductPage from "../pages/AdminProductPage.vue"
import OrderPage from "../pages/OrderPage.vue"
import AuthPage from "../pages/AuthPage.vue"
import RegistPage from "../pages/RegistPage.vue"
import AdminCartPage from "../pages/AdminCartPage.vue"
import CartItemPage from "../pages/CartItemPage.vue"
import OrderItemPage from "../pages/OrderItemPage.vue"
import ProductByPricePage from "../pages/ProductByPricePage.vue"
import ProductPage from "../pages/ProductPage.vue"
import CartPage from "../pages/CartPage.vue"
import AdminMainPage from "../pages/AdminMainPage.vue"

const routes = [
    {
        path: '/main',
        component: MainPage
    },
    {
        path: '/admin/products',
        component: AdminProductPage
    },
    {
        path: '/admin/orders',
        component: OrderPage
    },
    {
        path: '/auth',
        component: AuthPage
    },
    {
        path: '/admin/regist',
        component: RegistPage
    },
    {
        path: '/admin/carts',
        component: AdminCartPage
    },
    {
        path: '/admin/carts/items',
        component: CartItemPage
    },
    {
        path: '/admin/orders/items',
        component: OrderItemPage
    },
    {
        path: '/admin/products/price',
        component: ProductByPricePage
    },
    {
        path: '/products',
        component: ProductPage
    },
    {
        path: '/cart',
        component: CartPage
    },
    {
        path: '/admin/main',
        component: AdminMainPage
    }
]

const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router;