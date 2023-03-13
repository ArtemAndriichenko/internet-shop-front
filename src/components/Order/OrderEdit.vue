<template>
  <div class="edit--order">
    <h1 class="edit--label">
      Edit the Order
    </h1>
    <div class="input--element">
      <select class="form-select" v-model="statusProp">
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
        v-model="addressProp"
      >
    </div>
    <div class="btn--element">
      <button
        class="btn btn-warning"
        @click="editOrder();
        hideDialog()"
      >Save</button>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: 'order-edit',
  props: {
    itemProp: Object
  },
  computed: {
    orderId: {
      get(){
        return this.itemProp.id;
      }
    },
    statusProp: {
      get(){
        if(this.status == ''){
          return this.itemProp.status;
        }
        else{
          return this.status
        }
      },
      set(value){
        this.status = value
      }
    },
    userProp: {
      get(){
        if(this.userId == ''){
          return this.itemProp.user_id
        }
        else{
          return this.userId;
        }
      },
      set(value){
        this.userId = value
      }
    },
    addressProp:{
      get(){
        if(this.address == ''){
          return this.itemProp.address
        }
        else{
          return this.address;
        }
      },
      set(value){
        this.address = value
      }
    }
  },
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
  methods:{
    async editOrder(){
      this.price = parseFloat(this.price)
      try {
        await axios.put("http://localhost:8081/orders/" + this.orderId, {
          status: this.statusProp,
          user_id: this.userProp,
          address: this.addressProp,
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
    },
    getUsername(arr, userId){
      for(let i = 0; i < arr.length; i++){
        if(arr[i].id === userId){
          return arr[i].username
        }
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

    this.username = this.getUsername(this.users, this.userProp)
    this.userId = this.userProp
  }
}
</script>

<style scoped>
.edit-order{
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
