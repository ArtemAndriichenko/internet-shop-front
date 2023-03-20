<template>
  <div>
    <my-dialog :show="dialogVisiable" @updateShow='hideDialogCreate'>
      <admin-cart-edit
        :itemProp='setItem'
        @updateShowAfterUpdate='hideDialogEdit'
      ></admin-cart-edit>
    </my-dialog>
  </div>
  <div class="product-list">
    <div class="list--table" v-for="item in products" :key="item.id">
      <img :src="item.image" width="280" height="182">
      <div>
        {{item.name}}
      </div>
      <div>
        {{item.price}}
      </div>
    </div>
  </div>
  <div>
    <h2>Price: {{this.priceAll}}</h2>
  </div>
  <div class="btn--add">
    <button class="btn btn-outline-success" >Checkout</button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "cart-products",
  data() {
    return {
      cartItems: [],
      products: [],
      priceAll: 0
    };
  },
  async mounted() {
    this.startComponent()
  },
  methods: {
    async startComponent(){
      try {
        const response = await axios.get("http://localhost:8081/cart/cartItems/" + this.$store.state.auth.cartId, {
          headers: {
            Accept: "application/json",
          }
        });
        this.cartItems = response.data
      } catch (error) {
        console.error(error);
      }

      for(let i = 0; i < this.cartItems.length; i++) {
        this.getProduct(this.cartItems[i].product_id)
      }
    },
    async getProduct(productId) {
      try {
        const response = await axios.get("http://localhost:8081/products/" + productId, {
          headers: {
            Accept: "application/json",
          }
        });
        this.products.push(response.data)
        this.priceAll += response.data.price
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style scoped>
.btn--add{
  margin-inline: 190px;
  margin-block: 40px 50px;
  background: #d2ffea;
}
.list--table{
  margin-block: 30px 20px;
  display: inline-block;
  width: 300px;
  margin-left: 10%;
  border: 1px solid black;
  background: white;
}
.table{
  font-size: 18px;
}
td{
  padding-top: 15px;
  padding-bottom: 15px;
  word-wrap: break-word;
}
.div--btns{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 15px;
}
.btn{
  width: 100%;
}
.div__warning{
  width: 130px;
}
.div__danger{
  width: 130px;
}
.btn--add{
  margin-inline: 190px;
  margin-block: 40px 50px;
  background: #d2ffea;
}
h2{
  margin-top: 30px;
  text-align:center
}
</style>