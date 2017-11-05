<template>
  <div>
      Search Page <hr>
      You search [ {{ $route.params.tag }} ]
  </div>
</template>

<script>
export default {
    props: ['tag']
}
</script>

<style>

</style>
