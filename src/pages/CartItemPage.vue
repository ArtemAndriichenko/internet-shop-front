<template>
  <div>
    <cart-item-list></cart-item-list>
  </div>
</template>
  
<script>
import CartItemList from "../components/CartItem/CartItemList.vue"

export default {
  name: 'cart-item-page',
  components: {
    "cart-item-list": CartItemList
  }
}
</script>
  
<style scoped>
</style>