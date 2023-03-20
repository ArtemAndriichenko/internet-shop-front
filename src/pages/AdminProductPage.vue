<template>
  <div>
    <admin-product-list></admin-product-list>
  </div>
</template>
  
<script>
import AdminProductList from "../components/Product/AdminProductList.vue"

export default {
  name: 'admin-product-page',
  components: {
    "admin-product-list": AdminProductList
  }
}
</script>
  
<style scoped>
</style>