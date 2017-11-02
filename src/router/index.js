import Vue from 'vue'
import Router from 'vue-router'
import Header from '@/components/Header'
import Body from '@/components/Body'
import Footer from '@/components/Footer'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      components: {
        header: Header,
        body: Body,
        footer: Footer
      }
    }
  ]
})
