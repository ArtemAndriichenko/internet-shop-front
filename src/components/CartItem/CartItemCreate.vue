<template>
  <form @submit.prevent>
    <div class="create--cart--item">
      <h1 class="create--label">
          Create a Cart Item
      </h1>
      <div class="input--element">
        <select class="form-select" v-model="productName" @change="setProduct()" >
          <option value="" disabled hidden>Select product</option>
          <option v-for="item in products" :key="item._id">
            {{item.name}}
          </option>
        </select>
      </div>
      <div class="input--element">
        <select class="form-select" v-model="cartId" >
          <option value="" disabled hidden>Select carts</option>
          <option v-for="item in carts" :key="item._id">
            {{item.id}}
          </option>
        </select>
      </div>
      <div class="btn--element">
        <button
          class="btn btn-success"
          @click="addCartItem();
          hideDialog()"
        >Create</button>
      </div>
    </div>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: 'cart-item-create',
  data(){
    return{
      productName: "",
      productId: "",
      cartId: "",
      products: [],
      carts: []
    }
  },
  methods: {
    async addCartItem() {
      this.cartId = Number(this.cartId)
      try {
        await axios.post("http://localhost:8081/cartItems", {
          product_id: this.productId,
          cart_id: this.cartId,
          headers: {
            Accept: "application/json",
          }
        })
      } catch(error){
        console.log(error)
      }
    },
    hideDialog(){
        this.$emit('updateShowAfterCreate', false)
    },
    async setProduct(){
      try {
        const response = await axios.get("http://localhost:8081/products", {
          headers: {
            Accept: "application/json",
          },
        });
        const productList = response.data
        this.productId = productList[productList.findIndex(i => i.name === this.productName)].id
      } catch (error) {
        console.error(error);
      }
    }
  },
  async mounted() {
    try {
      const response = await axios.get("http://localhost:8081/carts", {
        headers: {
          Accept: "application/json",
        },
      });
      this.carts = response.data
    } catch (error) {
      console.error(error);
    }

    try {
      const response = await axios.get("http://localhost:8081/products", {
        headers: {
          Accept: "application/json",
        },
      });
      this.products = response.data
    } catch (error) {
      console.error(error);
    }
  }
}
</script>

<style scoped>
.create--cart--item{
    padding-block: 30px;
    padding-inline: 60px;
}
.form-control{
    border-color: #0c3823;
    font-size: 20px;
}
.form-select{
    border-color: #0c3823;
    font-size: 20px;
}
.input--element{
    margin-block: 30px 30px;
}
.btn--element{
    margin-top: 30px;
}
.create--label{
    padding: 10px;
    text-align: center;
    font-size: 28px;
    color: #0c3823;
}
.btn{
    font-size: 20px;
    width: 100%;
}
</style>