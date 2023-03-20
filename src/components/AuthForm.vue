<template>
  <div class="auth--form">
    <h1 class="auth--label">Authorization</h1>
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
        type="password"
        placeholder="Enter a password"
      >
    </div>
    <div class="error--element">
      <div v-if="isError" class="error__div">Error</div>
    </div>
    <div class="btn--element">
      <button
        class="btn btn-success"
        @click="verificationAuth()"
      >Log in</button>
    </div>
  </div>
</template>
  
<script>
import axios from "axios"

export default {
  name: "auth-form",
  data(){
    return{
      username: '',
      password: '',
      users: [],
      cartId: 0,
      isError: false
    }
  },
  async mounted() {
    this.$store.commit('auth/setNotUser')
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
    async verificationAuth(){
      if(this.username == 'admin' && this.password == 'admin'){
          this.$router.push('/main')
          this.$store.commit('auth/setAuthAdmin')
      } 

      for(let i = 0; i < this.users.length; i++){
        console.log(this.users)
        if(this.users[i].username === this.username && this.users[i].password === this.password){
          await this.getCartIdByUserId(this.users[i].id)
          this.$store.commit('auth/setAuthUser')
          this.$store.commit('auth/setUserId', this.users[i].id)
          this.$store.commit('auth/setUsername', this.users[i].username)
          this.$store.commit('auth/setUserPassword', this.users[i].password)
          this.$store.commit('auth/setCartId', this.cartId)
          this.$router.push('/main')
        }
      }

      this.isError = true
    },
    async getCartIdByUserId(id){
      try {
        const response = await axios.get("http://localhost:8081/carts/user/" + id, {
          headers: {
            Accept: "application/json",
          },
        })
        this.cartId = response.data.id
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>

<style scoped>
.auth--form{
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
.auth--label{
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