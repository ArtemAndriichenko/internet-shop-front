<template>
  <div class="cart-list">
    <div class="btn--add">
      <button
        class="btn btn-outline-success"
        @click="showDialogCreate"
      >Create a Cart</button>
    </div>
    <my-dialog :show="dialogVisiable" @updateShow='hideDialogCreate'>
      <admin-cart-create
        v-if="createOrEdit"
        @updateShowAfterCreate='hideDialogCreate'
      ></admin-cart-create>
      <admin-cart-edit
        v-else
        :itemProp='setItem'
        @updateShowAfterUpdate='hideDialogEdit'
      ></admin-cart-edit>
    </my-dialog>
    <div class="list--table" v-for="(item, i) in carts" :key="item._id">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">{{item.id}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td scope="col">user_id</td>
            <td>{{item.user_id}}</td>
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
            @click="deleteCart(item, i)"
          >Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import MyDialogVue from '../UI/MyDialog.vue'
import AdminCartCreate from './AdminCartCreate.vue'
import AdminCartEdit from './AdminCartEdit.vue'

export default {
  name: "cart-list",
  components: {
    "my-dialog": MyDialogVue,
    "admin-cart-create": AdminCartCreate,
    "admin-cart-edit": AdminCartEdit
  },
  data() {
    return {
      carts: [],
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
        const response = await axios.get("http://localhost:8081/carts", {
          headers: {
            Accept: "application/json",
          }
        });
        this.carts = response.data
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
      await new Promise((resolve) => setTimeout(resolve, 50))
      await this.startComponent()
      this.dialogVisiable = bool
    },
    async hideDialogCreate(bool){
      await new Promise((resolve) => setTimeout(resolve, 50))
      await this.startComponent()
      this.dialogVisiable = bool
    },
    async deleteCart(item, i){
      if (confirm("Do you really want to remove the cart?")) {
        try {
          await axios.delete("http://localhost:8081/carts/" + item.id)
          this.carts.splice(i, 1)
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