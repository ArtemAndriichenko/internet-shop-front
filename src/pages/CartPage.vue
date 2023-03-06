<template>
  <div>
    <cart-list></cart-list>
  </div>
</template>

<script>
import CartList from "../components/Cart/CartList.vue"

export default {
  name: 'CartPage',
  components: {
    "cart-list": CartList
  }
}
</script>

<style scoped>
.div-for-btn{
  margin-left: 20%;
  margin-right: 20%;
  margin-top: 1%;
}
.btn{
  width: 100%;
  font-size: 24px;
  background: rgb(221, 240, 154);
}
</style>