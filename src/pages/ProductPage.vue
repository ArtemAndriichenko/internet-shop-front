<template>
  <div>
    <product-list></product-list>
  </div>
</template>
  
<script>
import ProductList from "../components/Product/ProductList.vue"

export default {
  name: 'admin-product-page',
  components: {
    "product-list": ProductList
  }
}
</script>
  
<style scoped>
</style>