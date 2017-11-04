// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VeeValidate from 'vee-validate'

// Firebase
import firebase from 'firebase'
import firebaseui from 'firebaseui';
import { firebaseConfig } from './config'


import App from './App'
import router from './router'


Vue.config.productionTip = false
firebase.initializeApp(firebaseConfig)

// firebase.auth().onAuthStateChanged(user => {
//   if(user) {
//       console.log(user.displayName);
//   }
// });

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
