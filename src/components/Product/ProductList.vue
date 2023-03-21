/* eslint-disable */
<template>
  <div class="product-list">
    <div class="list--table" v-for="item in products" :key="item.id">
      <div>
        <img class="item-image" :src="item.image">
      </div>
      <div class="item-div">
        <p class="item-p">{{item.name}}</p>
      </div>
      <div class="item-div">
        <p class="item-p">{{item.price}}₴</p>
      </div>
      <div class="btn--add">
        <button 
          class="btn btn-outline-success" 
          @click="addCartItem(item.id)"
        >Add
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "product-list",
  data() {
    return {
      products: []
    };
  },
  async mounted() {
    this.startComponent()
  },
  methods: {
    async startComponent(){
      try {
        const response = await axios.get("http://localhost:8081/products", {
          headers: {
            Accept: "application/json",
          }
        });
        this.products = response.data
      } catch (error) {
        console.error(error);
      }
    },
    async addCartItem(productId){
      console.log(productId)
      console.log(this.$store.state.auth.cartId)
      try {
        await axios.post("http://localhost:8081/cartItems", {
          product_id: productId,
          cart_id: this.$store.state.auth.cartId,
          headers: {
            Accept: "application/json",
          }
        })
      } catch(error){
        console.log(error)
      }
    }
  }
};
</script>

<style scoped>
.btn--add{
  margin: 10px;
  background: #d2ffea;
}
.list--table{
  margin-block: 30px 20px;
  display: inline-block;
  width: 300px;
  margin-left: 10%;
  border: 2px solid rgb(42, 67, 4);
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
.item-image{
  border-bottom: 2px solid rgb(42, 67, 4);
  width: 297px; 
  height: 200px;
}
.item-div{
  margin: 10px
}
.item-p{
  font-size: 20px;
}
</style>