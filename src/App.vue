<template>
  <transition name="body-fade">
    <div id="app" v-if="auth && products">
      <router-view :Auth="auth" :Products="products" name="header"></router-view>
      <router-view :Auth="auth" :Products="products" name="body"></router-view>
    </div>
    <div v-else  class="body2-loading">
        <i class="fa fa-circle-o-notch fa-spin fa-5x fa-fw" v-if="!products || auth"></i>
    </div>
  </transition>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'app',
  data() {
    return {
      auth: null,
      products: null
    }
  },
  created() {
    // default this
    const this_ = this
    // Passdata to other component when login
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // return user
        this.auth = user
        // return product
        firebase.database().ref('products/').once('value').then( function(snapshot) {
          this_.products = snapshot.val()
        })
      }
    })
  },

}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.body-else {
  position: relative;
  left: 50%;
}
.body2-loading {
  width: 100%;
  height: 100%;
  position: fixed;
  top:0; bottom:0;
  right:0; left:0;
}
  .body2-loading i {
    position: relative;
    top: 45%;
    left: 45%;
    transform: translateY(-55%);
    transform: translateY(-55%);
  }

</style>
