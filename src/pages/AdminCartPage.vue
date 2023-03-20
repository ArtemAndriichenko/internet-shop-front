<template>
  <div>
    <admin-cart-list></admin-cart-list>
  </div>
</template>

<script>
import AdminCartList from "../components/Cart/AdminCartList.vue"

export default {
  name: 'admin-cart-page',
  components: {
    "admin-cart-list": AdminCartList
  }
}
</script>

<style scoped>
</style>