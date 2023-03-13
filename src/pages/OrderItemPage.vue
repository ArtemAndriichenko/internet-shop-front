<template>
  <div>
    <order-item-list></order-item-list>
  </div>
</template>
  
<script>
import OrderItemList from "../components/OrderItem/OrderItemList.vue"

export default {
  name: 'order-item-page',
  components: {
    "order-item-list": OrderItemList
  }
}
</script>
  
<style scoped>
</style>