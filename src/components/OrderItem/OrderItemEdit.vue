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
      <select class="form-select" v-model="orderProp" >
        <option v-for="item in orders" :key="item._id">
          {{item.id}}
        </option>
      </select>
    </div>
    <div class="btn--element">
      <button
        class="btn btn-warning"
        @click="editOrderItem();
        hideDialog()"
      >Save</button>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: 'order-item-edit',
  props: {
    itemProp: Object
  },
  computed: {
    orderItemId: {
      get(){
        return this.itemProp.id;
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
    },
    orderProp: {
      get(){
        if(this.orderId == 0){
            return Number(this.itemProp.order_id)
        }
        else{
            return Number(this.orderId)
        }
      },
      set(value){
        this.orderId = value
      }
    }
  },
  data(){
    return{
      productName: "",
      productId: "",
      products: [],
      orderId: "",
      orders: []
    }
  },
  methods:{
    async editOrderItem(){
      try {
        await axios.put("http://localhost:8081/orderItems/" + this.orderItemId, {
          product_id: this.productProp,
          order_id: this.orderProp,
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
      const response = await axios.get("http://localhost:8081/orders", {
        headers: {
          Accept: "application/json",
        },
      });
      this.orders = response.data
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