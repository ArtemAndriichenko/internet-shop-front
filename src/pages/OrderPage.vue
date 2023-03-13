<template>
  <div>
    <order-list></order-list>
  </div>
</template>
  
<script>
import OrderList from "../components/Order/OrderList.vue"

export default {
  name: 'order-page',
  components: {
    "order-list": OrderList
  }
}
</script>
  
<style scoped>
</style>