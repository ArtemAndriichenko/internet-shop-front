<template>
  <div>
    <cart-list></cart-list>
  </div>
</template>

<script>
import CartList from "../components/Cart/CartList.vue"

export default {
  name: 'cart-page',
  components: {
    "cart-list": CartList
  }
}
</script>

<style scoped>
</style>