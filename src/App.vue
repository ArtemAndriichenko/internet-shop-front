<template>
  <div>
    <admin-navbar v-if='$store.state.auth.isAdmin'></admin-navbar>
    <app-navbar v-else-if='$store.state.auth.isUser'></app-navbar>
    <auth-navbar v-else></auth-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import AuthNavbar from './components/AuthNavbar.vue'
import AdminNavbar from './components/AdminNavbar.vue'
import AppNavbar from './components/AppNavbar.vue'

export default {
  name: 'App',
  components: {
    "auth-navbar": AuthNavbar,
    "admin-navbar": AdminNavbar,
    "app-navbar": AppNavbar
  }
}
</script>

<style>

</style>
