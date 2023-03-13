<template>
  <div>
    <admin-navbar v-if='$store.state.auth.isAdmin'></admin-navbar>
    <app-navbar v-else-if='$store.state.auth.isUser'></app-navbar>
    <auth-navbar v-else></auth-navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import AuthNavbar from './components/Navbars/AuthNavbar.vue'
import AdminNavbar from './components/Navbars/AdminNavbar.vue'
import AppNavbar from './components/Navbars/AppNavbar.vue'

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
