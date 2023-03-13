<template>
  <div class="cart-list">
    <div class="btn--add">
      <button
        class="btn btn-outline-success"
        @click="showDialogCreate"
      >Create a Cart Item</button>
    </div>
    <my-dialog :show="dialogVisiable" @updateShow='hideDialogCreate'>
      <cart-item-create
        v-if="createOrEdit"
        @updateShowAfterCreate='hideDialogCreate'
      ></cart-item-create>
      <cart-item-edit
        v-else
        :itemProp='setItem'
        @updateShowAfterUpdate='hideDialogEdit'
      ></cart-item-edit>
    </my-dialog>
    <div class="list--table" v-for="(item, i) in cartItems" :key="item._id">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">{{item.id}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td scope="col">product_id</td>
            <td>{{item.product_id}}</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td scope="col">cart_id</td>
            <td>{{item.cart_id}}</td>
          </tr>
        </tbody>
      </table>
      <div class="div--btns">
        <div class="div__warning">
          <button
            class="btn btn-warning"
            @click="showDialogEdit(item)"
          >Edit</button>
        </div>
        <div class="div__danger">
          <button
            class="btn btn-danger"
            @click="deleteCartItem(item, i)"
          >Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MyDialogVue from '../UI/MyDialog.vue'
import CartItemCreate from './CartItemCreate.vue'
import CartItemEdit from './CartItemEdit.vue'

export default {
  name: "cart-item-list",
  components: {
    "my-dialog": MyDialogVue,
    "cart-item-create": CartItemCreate,
    "cart-item-edit": CartItemEdit
  },
  data() {
    return {
      cartItems: [],
      dialogVisiable: false,
      setItem: {},
      createOrEdit: false
    };
  },
  async mounted() {
    this.startComponent()
  },
  methods: {
    async startComponent(){
      try {
        const response = await axios.get("http://localhost:8081/cartItems", {
          headers: {
            Accept: "application/json",
          }
        });
        this.cartItems = response.data
      } catch (error) {
        console.error(error);
      }
    },
    showDialogEdit(item){
      this.createOrEdit = false
      this.setItem = item
      this.dialogVisiable = true
    },
    showDialogCreate(){
      this.createOrEdit = true
      this.dialogVisiable = true
    },
    async hideDialogEdit(bool){
      await new Promise((resolve) => setTimeout(resolve, 50));
      await this.startComponent()
      this.dialogVisiable = bool
    },
    async hideDialogCreate(bool){
      await new Promise((resolve) => setTimeout(resolve, 50));
      await this.startComponent()
      this.dialogVisiable = bool
    },
    async deleteCartItem(item, i){
      if (confirm("Do you really want to remove the cart item?")) {
        try {
          await axios.delete("http://localhost:8081/cartItems/" + item.id);
          this.cartItems.splice(i, 1);
        } catch (error) {
          console.error(error);
        } 
      }
    }
  }
};
</script>

<style scoped>
.btn--add{
  margin-inline: 190px;
  margin-block: 40px 50px;
  background: #d2ffea;
}
.list--table{
  margin-block: 30px 20px;
  display: inline-block;
  width: 300px;
  margin-left: 10%;
  border: 1px solid black;
  background: white;
}
.table{
  font-size: 18px;
}
td{
  padding-top: 15px;
  padding-bottom: 15px;
  word-wrap: break-word;
}
.div--btns{
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 15px;
}
.btn{
  width: 100%;
}
.div__warning{
  width: 130px;
}
.div__danger{
  width: 130px;
}
</style>