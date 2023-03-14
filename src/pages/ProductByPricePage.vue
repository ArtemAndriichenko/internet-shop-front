<template>
  <div>
    <product-price-table></product-price-table>
  </div>
</template>

<script>
import ProductPriceTable from "../components/ProductPriceTable.vue"

export default {
  name: 'order-price-page',
  components: {
    "product-price-table": ProductPriceTable
  }
}
</script>

<style scoped>
</style>