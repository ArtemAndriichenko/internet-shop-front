<template>
  <div class="edit-patient">
    <h1 class="edit--label">
      Edit the Cart Item
    </h1>
    <div class="input--element">
      <select class="form-select" v-model="productName" @change="setProduct()" >
        <option v-for="item in products" :key="item._id">
          {{item.name}}
        </option>
      </select>
    </div>
    <div class="input--element">
      <select class="form-select" v-model="cartProp" >
        <option v-for="item in carts" :key="item._id">
          {{item.id}}
        </option>
      </select>
    </div>
    <div class="btn--element">
      <button
        class="btn btn-warning"
        @click="editCartItem();
        hideDialog()"
      >Save</button>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: 'cart-item-edit',
  props: {
    itemProp: Object
  },
  computed: {
    cartItemId: {
      get(){
        return this.itemProp.id;
      }
    },
    cartProp: {
      get(){
        if(this.cartId == 0){
            return Number(this.itemProp.cart_id)
        }
        else{
            return Number(this.cartId)
        }
      },
      set(value){
        this.cartId = value
      }
    },
    productProp: {
      get(){
        if(this.productId == ''){
          return this.itemProp.product_id;
        }
        else{
          return this.productId;
        }
      },
      set(value){
        this.productId = value
      }
    }
  },
  data(){
    return{
      productName: '',
      productId: '',
      products: [],
      cartId: 0,
      carts: []
    }
  },
  methods:{
    async editCartItem(){
      try {
        await axios.put("http://localhost:8081/cartItems/" + this.cartItemId, {
          product_id: this.productProp,
          cart_id: this.cartProp,
          headers: {
            Accept: "application/json",
          }
        });
      } catch (error) {
        console.error(error);
      }  
    },
    async hideDialog(){
        this.$emit('updateShowAfterUpdate', false)
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
        console.log(this.productId)
      } catch (error) {
        console.error(error);
      }
    },
    getProductName(arr, productId){
      for(let i = 0; i < arr.length; i++){
        if(arr[i].id === productId){
          return arr[i].name
        }
      }
    }
  },
  async mounted() {
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

    this.productName = this.getProductName(this.products, this.productProp)
    this.productId = this.productProp
  }
}
</script>

<style scoped>
.edit-patient{
  padding-block: 30px;
  padding-inline: 60px;
}
.form-control{
  border-color: black;
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
.edit--label{
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