<template>
  <div class="reg--form">
    <h1 class="reg--label">Registration</h1>
    <div class="input--element">
      <input
        class="form-control"
        v-model="username"
        type="text"
        placeholder="Enter a username"
      >
    </div>
    <div class="input--element">
      <input
        class="form-control"
        v-model="password"
        type="text"
        placeholder="Enter a password"
      >
    </div>
    <div class="input--element">
      <input
        class="form-control"
        v-model="passwordAgain"
        type="text"
        placeholder="Enter a password again"
      >
    </div>
    <div class="error--element">
      <div v-if="isError" class="error__div">Error</div>
    </div>
    <div class="btn--element">
      <button
        class="btn btn-success"
        @click="verificationReg()"
      >Register</button>
    </div>
  </div>
</template>
  
<script>
import axios from "axios"

export default {
  name: "regist-form",
  data(){
    return{
      username: '',
      password: '',
      passwordAgain: '',
      users: [],
      isError: false
    }
  },
  async mounted() {
    this.startComponent()
  },
  methods: {
    async startComponent(){
      try {
        const response = await axios.get("http://localhost:8081/users", {
          headers: {
            Accept: "application/json",
          },
        });
        this.users = response.data;
      } catch (error) {
        console.error(error)
      }
    },
    verificationReg(){
      if(this.password != this.passwordAgain){
        this.isError = true
        return
      }

      for(let i = 0; i < this.users.length; i++){
        if(this.users[i].username === this.username){
          this.isError = true
          return
        }
      }

      this.registration()
      this.$router.push('/auth')
    },
    async registration(){
      try {
        await axios.post("http://localhost:8081/users", {
          username: this.username,
          password: this.password,
          headers: {
            Accept: "application/json",
          }
        })
      } catch (error){
        console.error(error)
      }
    }
  }
}
</script>

<style scoped>
.reg--form{
  margin-top: 100px;
  margin-inline: 500px;
  padding: 50px;
  border: 2px solid #198754;
}
.input--element{
  margin-top: 50px;
  margin-bottom: 30px;
}
.btn{
  font-size: 20px;
  width: 100%;
}
.form-control{
  border-color: #0c3823;
  font-size: 20px;
}
.reg--label{
  padding: 10px;
  text-align: center;
  font-size: 28px;
  color: #0c3823;
}
.error__div{
  font-size: 20px;
  color: red;
  text-align: center;
}
.btn--element{
  margin-top: 30px;
}
</style>