import Vue from 'vue'
import Router from 'vue-router'

// Layout
import Header from '@/components/Layout/Header'
import Body from '@/components/Layout/Body'
import Footer from '@/components/Layout/Footer'



import About from '@/components/About'


import Product from '@/components/Store/Product'
import Cart from '@/components/Store/Cart'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      components: {
        header: Header,
        body: Body,
        footer: Footer,
      },
      children: [
        { path: '/', redirect: '/home'},
        { path: '/home', component: Product, name: 'Home'},
        { path: '/about', component: About, name: 'About'},
        { path: '/cart', component: Cart, name: 'Cart'}
      ]
    }
  ]
})


