<template>
  <div class="navbar">
    <div
      class="navbar__logo"
      @click="$router.push('/main')"
    >Shop</div>
    <div class="navbar__location">
      <div class="navbar__element">
        <button
          class="btn btn-success"
          type="button"
          @click="$router.push('/admin/carts')"
        >Carts
        </button>
      </div>
      <div class="navbar__element">
        <button
          class="btn btn-success"
          type="button"
          @click="$router.push('/admin/carts/items')"
        >CartItems</button>
      </div>
      <div class="navbar__element">
        <button
          class="btn btn-success"
          type="button"
          @click="$router.push('/admin/orders')"
        >Orders</button>
      </div>
      <div class="navbar__element">
        <button
          class="btn btn-success"
          type="button"
          @click="$router.push('/admin/orders/items')"
        >OrderItems</button>
      </div>
      <div class="navbar__element">
        <button
          class="btn btn-success"
          type="button"
          @click="$router.push('/admin/products')"
        >Products</button>
      </div>
      <div class="navbar__element">
        <button
          class="btn btn-success"
          type="button"
          @click="$router.push('/admin/products/price')"
        >Product Price</button>
      </div>
      <div class="navbar__element">
        <button
          class="btn btn-success"
          type="button"
          @click="$router.push('/auth')"
        >Log out</button>
      </div>
    </div>
  </div>
</template>
  
<script>
export default {
  name: 'admin-navbar',
}
</script>
  
<style>
.navbar {
  height: 70px;
  background-color: #198754;
  box-shadow: 2px 2px 4px gray;
  display: flex;
  align-items: center;
  padding: 0 15px;
}
.navbar__location {
  margin-left: auto;
}
.navbar__element{
  display: inline-block;
  margin-left: 40px;
}
.navbar__logo{
  margin-left: 20px;
  font-size: 24px;
  color: white;
}
.label__lang{
  font-size: 20px;
  color: white;
}
.btn{
  font-size: 24px;
}
</style>