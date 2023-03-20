<template>
  <div class="cart-list">
    <div class="list--table" v-for="item in products" :key="item.id">
      <img :src="item.image" width="280" height="182">
      <div>
        {{item.name}}
      </div>
      <div>
        {{item.price}}
      </div>
      <button 
        class="btn btn-outline-success" 
        @click="addCartItem(item.id)"
      >
        Add
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: 'admin-cart-edit',
  props: {
    itemProp: Object
  },
  computed: {
    cartId: {
      get(){
        return this.itemProp.id
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
    }
  },
  data(){
    return{
      username: '',
      userId: '',
      users: []
    }
  },
  methods:{
    async editCart(){
      console.log(typeof this.userProp)
      try {
        await axios.put("http://localhost:8081/carts/" + this.cartId, {
          user_id: this.userProp,
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
.edit-cart{
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