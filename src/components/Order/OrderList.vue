<template>
  <div class="order-list">
    <div class="btn--add">
      <button
        class="btn btn-outline-success"
        @click="showDialogCreate"
      >Create a Order</button>
    </div>
    <my-dialog :show="dialogVisiable" @updateShow='hideDialogCreate'>
      <order-create
        v-if="createOrEdit"
        @updateShowAfterCreate='hideDialogCreate'
      ></order-create>
      <order-edit
        v-else
        :itemProp='setItem'
        @updateShowAfterUpdate='hideDialogEdit'
      ></order-edit>
    </my-dialog>
    <div class="list--table" v-for="(item, i) in orders" :key="item._id">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">{{item.id}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td scope="col">status</td>
            <td>{{item.status}}</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td scope="col">price</td>
            <td>{{item.price}}</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td scope="col">user_id</td>
            <td>{{item.user_id}}</td>
          </tr>
        </tbody>
        <tbody>
          <tr>
            <td scope="col">address</td>
            <td>{{item.address}}</td>
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
            @click="deleteOrder(item, i)"
          >Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MyDialogVue from '../UI/MyDialog.vue'
import OrderCreate from './OrderCreate.vue'
import OrderEdit from './OrderEdit.vue'

export default {
  name: "order-list",
  components: {
    "my-dialog": MyDialogVue,
    "order-create": OrderCreate,
    "order-edit": OrderEdit
  },
  data() {
    return {
      orders: [],
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
        const response = await axios.get("http://localhost:8081/orders", {
          headers: {
            Accept: "application/json",
          }
        });
        this.orders = response.data
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
    async deleteOrder(item, i){
      if (confirm("Do you really want to remove the order?")) {
        try {
          await axios.delete("http://localhost:8081/order/" + item.id);
          this.orders.splice(i, 1);
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
