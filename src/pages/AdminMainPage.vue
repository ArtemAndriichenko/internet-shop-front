<template>
  <div class="main">
    <h1 class="main--word">Welcome</h1>
    <div class="description"></div>
    <div>
      <div class="btns--top">
        <button class="btn btn-success" @click="$router.push('/products')">Carts</button>
        <button class="btn btn-success" @click="$router.push('/cart')">CartItems</button>
        <button class="btn btn-success" @click="$router.push('/cart')">Orders</button>
      </div>
      <div class="btns--bot">
        <button class="btn btn-success" @click="$router.push('/products')">OrderItems</button>
        <button class="btn btn-success" @click="$router.push('/cart')">Products</button>
        <button class="btn btn-success" @click="$router.push('/cart')">ProductPrice</button>
      </div>
    </div>
  </div>
</template>
  
<script>
import axios from "axios"
export default {
  name: 'main-page',
  data() {
    return {
      users: []
    };
  },
  async mounted() {
    try {
      const response = await axios.get("http://localhost:8081/users", {
        headers: {
          Accept: "application/json",
        },
      });
      this.users = response.data;
    } catch (error) {
      console.error(error);
    }
  }
}
</script>
  
<style scoped>
.main{
  margin-top: 200px;
  margin-inline: 350px;
  padding: 50px;
  border: 2px solid #198754;
}
.main--word{
  padding: 10px;
  text-align: center;
  font-size: 28px;
  color: #0c3823;
}
.description{
  text-align: left;
  font-size: 24px;
  padding-bottom: 25px;
}
.btns--top{
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}
.btns--bot{
  display: flex;
  justify-content: center;
  margin-top: 20px;
}
.btn{
  margin-inline: 40px;
  width: 170px;
}
</style>