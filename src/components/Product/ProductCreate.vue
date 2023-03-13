<template>
<<<<<<< HEAD
  <form @submit.prevent>
    <div class="create--product">
      <h1 class="create--label">
        Create a Product
      </h1>
      <div class="input--element">
        <input
          class="form-control"
          v-model="name"
          type="text"
          placeholder="Enter a product name"
        >
      </div>
      <div class="input--element">
        <input
          class="form-control"
          v-model="price"
          type="text"
          placeholder="Enter a product price"
        >
      </div>
      <div class="btn--element">
        <button
          class="btn btn-success"
          @click="addProduct();
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
      name: "",
      price: 0
    }
  },
  methods: {
    async addProduct() {
      this.price = parseFloat(this.price)
      try {
        await axios.post("http://localhost:8081/products", {
          name: this.name,
          price: this.price,
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
    }
  }
}
</script>

<style scoped>
.create--product{
=======
    <form @submit.prevent>
      <div class="create--patient">
        <h1 class="create--label">
            Create a Product
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
            @click="addProduct();
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
        username: "",
        userId: "",
        users: []
      }
    },
    methods: {
      async addProduct() {
        try {
          await axios.post("http://localhost:8081/products", {
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
>>>>>>> d7f11bc28f458076d4aaad1d9c3de5daab34e20a
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