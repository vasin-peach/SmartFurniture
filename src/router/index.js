import Vue from 'vue'
import Router from 'vue-router'

// Layout
import Header from '@/components/Layout/Header'
import Body from '@/components/Layout/Body'
import Home from '@/components/Layout/Home'



import About from '@/components/About'

import Product from '@/components/Store/Product'
import Cart from '@/components/Store/Cart'
import Search from '@/components/Store/Search'


import Json from '@/components/Json'

Vue.use(Router)



export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      components: {
        header: Header,
        body: Body,
      },
      children: [
        { path: '/', redirect: '/home'},
        { path: '/home', component: Home, name: 'Home'},
        { path: '/product', component: Product, name: 'Product', meta: { requiresAuth: true }},
        { path: '/about', component: About, name: 'About'},
        { path: '/cart/:article', component: Cart, name: 'Cart', meta: { requiresAuth: true }},
        { path: '/json', component: Json, name: 'Json', meta: { requiresAuth: true }},
        { path: '/search/:searchVal', component: Search, name: 'Search', meta: { requiresAuth: true}},
      ]
    }
  ]
})




