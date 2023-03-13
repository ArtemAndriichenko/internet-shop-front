<template>
  <form @submit.prevent>
    <div class="create--order--item">
      <h1 class="create--label">
          Create a Order Item
      </h1>
      <div class="input--element">
        <select class="form-select" v-model="productName" @change="setProduct()" >
          <option v-for="item in products" :key="item._id">
            {{item.name}}
          </option>
        </select>
      </div>
      <div class="input--element">
        <select class="form-select" v-model="orderId" >
          <option v-for="item in orders" :key="item._id">
            {{item.id}}
          </option>
        </select>
      </div>
      <div class="btn--element">
        <button
          class="btn btn-success"
          @click="addOrderItem();
          hideDialog()"
        >Create</button>
      </div>
    </div>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: 'order-item-create',
  data(){
    return{
      productName: "",
      productId: "",
      products: [],
      orderId: "",
      orders: []
    }
  },
  methods: {
    async addOrderItem() {
      this.orderId = Number(this.orderId)
      try {
        await axios.post("http://localhost:8081/orderItems", {
          product_id: this.productId,
          order_id: this.orderId,
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
  }
}
</script>

<style scoped>
.create--order--item{
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