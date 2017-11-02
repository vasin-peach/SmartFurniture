<template>
  <div class="container-fluid body">
    <transition :name="transitionName" mode="out-in">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'Body',
  data() {
    return {
      transitionName: 'slide-left'
    }
  },
  beforeRouteUpdate(to, from, next) {
    const toDepth = to.path.split('/').length
    const fromDepth = from.path.split('/').length
    this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left'
    next()
  }
}
</script>

<style>

.slide-left-enter-active, .slide-left-leave-active {
  transition: opacity .5s;
}
.slide-left-enter, .slide-left-leave-to {
  opacity: 0;
}
</style>