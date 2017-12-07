<template>
  <transition name="body-fade">
    <div id="app" class="app">
      <div v-if="">
        <router-view name="header"></router-view>
        <router-view :Auth="auth" :Products="products" name="body"></router-view>
      </div>
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
      products: null,
      searchAll: []
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
  /* background-image: url('assets/loading-bg.jpg'); */
  border-radius: 10px;
}
.body-else {
  position: relative;
  left: 50%;
}
.body2-loading {
  position: fixed;
  top:0; bottom:0;
  right:0; left:0;
  overflow: hidden;
}
  .body2-loading i{
    position: relative;
    top: 42%;
    transform: translate(-50%, -50%)
   
  }
  .signin {
    position: absolute;
    top: 42%;
    left: 42%;
    transform: translate(-50%, -50%)
  }

</style>
