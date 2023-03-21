<template>
  <div>
    <my-dialog :show="dialogVisiable" @updateShow='hideDialog'>
      <order-create-user
        :itemProp='products'
        :priceProductsProp='priceAll'
        @updateShowAfterUpdate='hideDialog'
      ></order-create-user>
    </my-dialog>
  </div>
  <div class="product-list">
    <div class="list--table" v-for="item in products" :key="item.id">
      <div>
        <img class="item-image" :src="item.image">
      </div>
      <div class="item-div">
        <div class="product-box">
          <div class="product-el">
            <p class="item-p">{{item.name}}</p>
          </div>
          <div class="product-btn">
            <button 
              class="btn btn-outline-primary"
              @click="minusProduct(item)"
            >-</button>
          </div>
          <div class="product-el">
            <p class="item-p">{{item.count}}</p>
          </div>
          <div class="product-btn">
            <button 
              class="btn btn-outline-primary"
              @click="plusProduct(item)"
            >+</button>
          </div>
        </div>
      </div>
      <div class="item-div">
        <p class="item-p">{{item.price}}₴ x {{item.count}} = {{item.price * item.count}}₴</p>
      </div>
      <div class="btn--delete">
        <button 
          class="btn btn-outline-danger" 
          @click="deleteCartItem(item)"
        >Delete
        </button>
      </div>
    </div>
  </div>
  <div class="order-box">
    <div class="order-left">
      <h2>Price: {{this.priceAll}}₴</h2>
    </div>
    <div class="order-right">
      <button  class="btn btn-outline-success" @click="showDialog">Checkout</button>
    </div>
  </div>
</template>

<script>
import OrderCreateUser from '../Order/OrderCreateUser.vue'
import MyDialogVue from '../UI/MyDialog.vue'
import axios from "axios";

export default {
  name: "cart-products",
  components: {
    "my-dialog": MyDialogVue,
    "order-create-user": OrderCreateUser
  },
  data() {
    return {
      products: [],
      priceAll: 0,
      dialogVisiable: false
    };
  },
  async mounted() {
    this.startComponent()
  },
  methods: {
    async startComponent(){
      try {
        const response = await axios.get("http://localhost:8081/cart/" + this.$store.state.auth.cartId, {
          headers: {
            Accept: "application/json",
          }
        });
        this.products = response.data
        console.log(this.products)
      } catch (error) {
        console.error(error);
      }

      this.priceAll = 0
      for(let i = 0; i < this.products.length; i++){
        this.priceAll += this.products[i].price * this.products[i].count
      }
    },
    showDialog(){
      this.dialogVisiable = true
    },
    async hideDialog(bool){
      this.dialogVisiable = bool
    },
    async deleteCartItem(item){
      if (confirm("Do you really want to remove the cart item?")) {
        try {
          await axios.delete("http://localhost:8081/cartItems/" + this.$store.state.auth.cartId + "/" + item.id)
          
        } catch (error) {
          console.error(error);
        } 

        this.startComponent()
      }
    },
    async plusProduct(item){
      try {
        await axios.post("http://localhost:8081/cartItems", {
          product_id: item.id,
          cart_id: this.$store.state.auth.cartId,
          headers: {
            Accept: "application/json",
          }
        })
      } catch(error){
        console.log(error)
      }

      this.startComponent()
    },
    async minusProduct(item){
      if(item.count <= 1){
        return
      }

      try {
          await axios.delete("http://localhost:8081/cartItem/" + this.$store.state.auth.cartId + "/" + item.id);
      } catch (error) {
        console.error(error);
      } 

      this.startComponent()
    }
  }
};
</script>

<style scoped>
.btn--add{
  background: #d2ffea;
  display: inline-block;
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
.btn-outline-success {
  width: 300%;
  background: #d2ffea;
}
.div__warning{
  width: 130px;
}
.div__danger{
  width: 130px;
}
h2{
  text-align: center;
  color: rgb(32, 49, 7);
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
.order-box{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 3%;
}
.order-left{
  margin-right: 3%;
}
.order-right{
  margin-right: 15%;
}
.btn--delete{
  margin: 10px;
  background: #ffd8d8;
}
.btn-outline-danger{
  width: 100%;
}
.product-box{
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.btn-outline-primary {
  font-size: 20px;
  background: #d2ffea;
}
.product-el{
  margin-top: 3%;
  margin-right: 5%;
}
.product-btn {
  margin-right: 5%;
}
</style>