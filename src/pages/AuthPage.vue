<template>
  <div>
    <auth-form></auth-form>
  </div>
</template>

<script>
import AuthForm from '../components/AuthForm.vue'

export default {
  name: 'AuthPage',
  components: {
    "auth-form": AuthForm
  }
}
</script>

<style>
</style>