<template>
    <form @submit.prevent>
      <div class="create--patient">
        <h1 class="create--label">
            Create a User
        </h1>
        <div class="input--element">
          <label for="username" class="form-label">Username</label>
          <input type="text" class="form-control" v-model="username" id="username">
        </div>
        <div class="btn--element">
          <button
            class="btn btn-success"
            @click="addUser();
            hideDialog()"
          >Create</button>
        </div>
      </div>
    </form>
  </template>
  <script>
  import axios from "axios";
  
  export default {
    name: 'user-create',
    data(){
      return{
        username: "",
      }
    },
    methods: {
      async addUser() {
        try {
          await axios.post("http://localhost:8081/users", {
            username: this.username,
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
  .form-label{
      font-size: 24px;
      color: #0c3823;
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