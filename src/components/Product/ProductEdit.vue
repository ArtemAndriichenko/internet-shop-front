<template>
<<<<<<< HEAD
  <div class="edit--product">
    <h1 class="edit--label">
      Edit the Product
    </h1>
    <div class="input--element">
      <input
        class="form-control"
        v-model="nameProp"
        type="text"
      >
    </div>
    <div class="input--element">
      <input
        class="form-control"
        v-model="priceProp"
      >
    </div>
    <div class="btn--element">
      <button
        class="btn btn-warning"
        @click="editProduct();
        hideDialog()"
      >Save</button>
    </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: 'product-edit',
  props: {
    itemProp: Object
  },
  computed: {
    productId: {
      get(){
        return this.itemProp.id;
      }
    },
    nameProp: {
      get(){
        if(this.name == ''){
          return this.itemProp.name;
        }
        else{
          return this.name
        }
      },
      set(value){
        this.name = value
      }
    },
    priceProp:{
      get(){
        if(this.price == 0){
          return this.itemProp.price
        }
        else{
          return this.price;
        }
      },
      set(value){
        this.price = value
      }
    }
  },
  data(){
    return{
      name: '',
      price: 0
    }
  },
  methods:{
    async editProduct(){
      this.price = parseFloat(this.price)
      try {
        await axios.put("http://localhost:8081/products/" + this.productId, {
          name: this.nameProp,
          price: this.priceProp,
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
    }
  }
}
</script>

<style scoped>
.edit-product{
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
=======
    <div class="edit-patient">
      <h1 class="edit--label">
        Edit the Product
      </h1>
      <div class="input--element">
        <select class="form-select" v-model="username" @change="setUser()" >
          <option v-for="item in users" :key="item.id">
            {{item.username}}
          </option>
        </select>
      </div>
      <div class="btn--element">
        <button
          class="btn btn-warning"
          @click="editProduct();
          hideDialog()"
        >Save</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios"
  
  export default {
    name: 'product-edit',
    props: {
      itemProp: Object
    },
    computed: {
      productId: {
        get(){
          return this.itemProp.id;
        }
      },
      userProp: {
        get(){
          if(this.userId == ''){
              return this.itemProp.user.id;
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
        async editProduct(){
          try {
            await axios.put("http://localhost:8081/products/" + this.productId, {
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
      this.username = this.getUsername(this.users, this.bedProp)
      this.userId = this.bedProp
    }
  }
  </script>
  
  <style scoped>
  .edit-patient{
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
>>>>>>> d7f11bc28f458076d4aaad1d9c3de5daab34e20a
