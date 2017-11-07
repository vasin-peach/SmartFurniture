<template>
  <div>
    <!-- Body Container -->
    <div class="container-fluid body">
      <transition name="body-fade">
        <div v-if="!auth">
          <div @click="plsLogin()" class="body-fade"></div>
        </div>
      </transition>
      <transition :name="transitionName" mode="out-in">
        <router-view class="body-container"></router-view>
      </transition>
    </div>

    <!-- Modal Please login -->
    <div class="modal fade" id="popup-please-login" role="dialog">
      <div class="modal-dialog modal-sm">
        <div class="modal-content" style="box-shadow: 0 1px 5px 1px;">
          <div class="modal-header" style="border-radius: 5px;">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <span class="modal-title">You must be logged in.</span>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Body',
  created() {
    firebase.auth().onAuthStateChanged(user => { // Check Login?
      if(user) { // User Login
        this.auth = user
      } else { // User Logout
        this.auth = false
      }
    });
  },
  data() {
    return {
      transitionName: 'slide-left',
      auth: null,
    }
  },
  beforeRouteUpdate(to, from, next) { // Provider
    if (this.auth) {
      const toDepth = to.path.split('/').length
      const fromDepth = from.path.split('/').length
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
      next()
    } else {
      $('#popup-please-login').modal('show')
    }
  },
  methods: {
    plsLogin() {
      $('#popup-please-login').modal('show')
    }
  }
}
</script>




<style>
body {
  padding: 15px 10px 5px 10px;
}
@media (max-width: 768px) {
  body {
    padding-bottom: 65px;
  }
}

/* Container Transition */
.slide-left-enter-active, .slide-left-leave-active {
  transition: opacity .5s;
}
.slide-left-enter, .slide-left-leave-to {
  opacity: 0;
}

/* Body-Fade Transition */
.body-fade-enter-active, .body-fade-leave-active {
    transition: opacity .5s ease;;
}
.body-fade-enter, .body-fade-leave-to {
    opacity: 0;
}


/* Body Transition Auth */
.body {
  transition: all 0.5s ease;
}


/* Body Fade */
.body-fade {
  transition: 0.3s;
}

/* Modal dialog mobile */
@media (max-width: 768px) {
    .modal-dialog {
        padding: 15%;
    }
}
</style>