<template>
  <div>
    About Page
    <hr>
    <button @click="show = !show"> Toggle </button>
    <transition name="fade">
      <p v-if="show">Hello</p>
    </transition>
    <hr>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: true
    }
  }
}
</script>

<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0
}
</style>
