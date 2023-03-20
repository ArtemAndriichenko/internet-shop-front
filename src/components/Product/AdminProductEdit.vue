<template>
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
    <div class="input--element">
      <textarea
        class="form-control"
        v-model="imageProp"
      />
    </div>
    <div class="input--element">
      <textarea
        class="form-control"
        v-model="descriptionProp"
      />
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
  name: 'admin-product-edit',
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
    },
    imageProp:{
      get(){
        if(this.imageUrl == ""){
          return this.itemProp.image
        }
        else{
          return this.imageUrl;
        }
      },
      set(value){
        this.imageUrl = value
      }
    },
    descriptionProp:{
      get(){
        if(this.description == ""){
          return this.itemProp.description
        }
        else{
          return this.description;
        }
      },
      set(value){
        this.description = value
      }
    }
  },
  data(){
    return{
      name: '',
      price: 0,
      description: "",
      imageUrl: ""
    }
  },
  methods:{
    async editProduct(){
      this.price = parseFloat(this.price)
      try {
        await axios.put("http://localhost:8081/products/" + this.productId, {
          name: this.nameProp,
          price: this.priceProp,
          description: this.descriptionProp,
          image: this.imageProp,
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
