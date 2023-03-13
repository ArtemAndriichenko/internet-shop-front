<template>
  <form @submit.prevent>
    <div class="create--order">
      <h1 class="create--label">
        Create an Order
      </h1>
      <div class="input--element">
        <select class="form-select" v-model="status">
          <option v-for="(item, index) in statuses" :key="index">
            {{item}}
          </option>
        </select>
      </div>
      <div class="input--element">
        <select class="form-select" v-model="username" @change="setUser()" >
          <option v-for="item in users" :key="item._id">
            {{item.username}}
          </option>
        </select>
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
          @click="addOrder();
          hideDialog()"
        >Create</button>
      </div>
    </div>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: 'product-create',
  data(){
    return{
      status: '',
      username: '',
      userId: '',
      users: [],
      address: '',
      statuses: ['Pending', 'Processing', 'Payment Received', 'Shipped', 
      'Delivered', 'Accepted', 'Cancelled', 'Refunded', 'Returned', 'On Hold']
    }
  },
  methods: {
    async addOrder() {
      console.log(this.status)
      try {
        await axios.post("http://localhost:8081/orders", {
          status: this.status,
          user_id: this.userId,
          address: this.address,
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
    async setUser(){
      try {
        const response = await axios.get("http://localhost:8081/users", {
          headers: {
            Accept: "application/json",
          },
        });
        const userList = response.data
        this.userId = userList[userList.findIndex(i => i.username === this.username)].id
      } catch (error) {
        console.error(error);
      }
    }
  },
  async mounted() {
    try {
      const response = await axios.get("http://localhost:8081/users", {
        headers: {
          Accept: "application/json",
        },
      });
      this.users = response.data
    } catch (error) {
      console.error(error);
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
