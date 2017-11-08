// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

// Default
import Vue from 'vue'
import VeeValidate from 'vee-validate'
// Firebase
import firebase from 'firebase'
import firebaseui from 'firebaseui';
import { firebaseConfig } from './config'

import App from './App'
import router from './router'



// Login Provider
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) { // if route have meta requiresAuth
    firebase.auth().onAuthStateChanged(user => {
      if(user) {
        next()
      } else {
        console.log('You must be logged in for enter this page.')
        next({
          path: '/home',
        })
      }
    });
  } else {
    next()
  }
})


// Vue setup
Vue.config.productionTip = false
Vue.use(firebase)
firebase.initializeApp(firebaseConfig)



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App },
  http: {
    root: '/root',
    headers: {
      Authorization: 'Basic YXBpOnBhc3N3b3Jk'
    }
  },
  data() {
    return {
      auth: null
    }
  }
})

