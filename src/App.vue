<template>
  <div>
    <navbar></navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import AppNavbar from './components/AppNavbar.vue'
export default {
  name: 'App',
  components: {
    "navbar": AppNavbar
  }
}
</script>

<style>

</style>
