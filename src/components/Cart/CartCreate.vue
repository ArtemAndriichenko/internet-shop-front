<template>
  <form @submit.prevent>
    <div class="create--patient">
      <h1 class="create--label">
          Create a Cart
      </h1>
      <div class="input--element">
        <select class="form-select" v-model="username" @change="setUser()" >
          <option v-for="item in users" :key="item._id">
            {{item.username}}
          </option>
        </select>
      </div>
      <div class="btn--element">
        <button
          class="btn btn-success"
          @click="addCart();
          hideDialog()"
        >Create</button>
      </div>
    </div>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: 'cart-create',
  data(){
    return{
      username: "",
      userId: "",
      users: []
    }
  },
  methods: {
    async addCart() {
      try {
        await axios.post("http://localhost:8081/carts", {
          user_id: this.userId,
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
.create--patient{
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