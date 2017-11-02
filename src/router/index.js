import Vue from 'vue'
import Router from 'vue-router'

import Header from '@/components/Header'
import Body from '@/components/Body'
import Footer from '@/components/Footer'

import About from '@/components/About'

import Login from '@/components/Auth/Login'
import Register from '@/components/Auth/Register'

import Product from '@/components/Store/Product'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      components: {
        header: Header,
        body: Body,
        footer: Footer
      },
      children: [
        { path: '/', redirect: '/home'},
        { path: '/home', component: Product, name: 'Home'},
        { path: '/about', component: About, name: 'About'},
        { path: '/login', component: Login, name: 'Login'},
        { path: '/register', component: Register, name: 'Register'}
      ]
    }
  ]
})


