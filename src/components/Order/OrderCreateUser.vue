<template>
  <div>
    <form @submit.prevent>
      <div class="create--order">
        <h1 class="create--label">
          Order
        </h1>
        <div>
          <p class="p-title">Products:</p>
        </div>
        <div class="products-table" v-for="item in productsProp" :key="item.id">
          <div class="item-div">
            <p class="item-p">{{item.name}} x{{item.count}}</p>
          </div>
        </div>
        <div>
          <p class="p-title">Client:</p>
        </div>
        <div class="item-div">
          <p class="item-p">{{this.$store.state.auth.username}}</p>
        </div>
        <div>
          <p class="p-title">Price:</p>
        </div>
        <div class="item-div">
          <p class="item-p">{{this.priceProp}}₴</p>
        </div>
        <div class="input--element">
          <input
            class="form-control"
            v-model="address"
            type="text"
            placeholder="Enter a product address"
          >
        </div>
        <div class="btn--element">
          <button
            class="btn btn-success"
            @click="createOrder();
            hideDialog()"
          >Create</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'order-create-user',
  props: {
    itemProp: Array,
    priceProductsProp: Number
  },
  computed: {
    productsProp: {
      get(){
        return this.itemProp;
      }
    },
    priceProp: {
      get(){
        return this.priceProductsProp
      }
    }
  },
  data(){
    return{
      status: 'Processing',
      address: ''
    }
  },
  methods:{
    async hideDialog(){
      this.$emit('updateShowAfterUpdate', false)
    },
    async createOrder(){
      try {
        await axios.post("http://localhost:8081/orders/" + this.$store.state.auth.cartId, {
          status: this.status,
          user_id: this.$store.state.auth.username,
          address: this.address,
          headers: {
            Accept: "application/json",
          }
        })
      } catch(error){
        console.log(error)
      }

      try {
        await axios.delete("http://localhost:8081/cartItemsFromCart/" + this.$store.state.auth.cartId)
      } catch(error){
        console.log(error)
      }

      this.$router.push('/products')
    }
  }
}
</script>

<style scoped>
.create--order{
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
.create--label{
    padding: 10px;
    text-align: center;
    font-size: 28px;
    color: #0c3823;
}
.item-p{
  font-size: 18px;
  color: #455518;
}
.p-title{
  font-size: 21px;
  color: #0c3823;
}
.item-div{
  margin-left: 3%;
}
</style>
