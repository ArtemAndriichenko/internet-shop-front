<template>
    <div class="user-list">
      <div class="btn--add">
        <button class="btn btn-outline-success" @click="showCreateDialog">Create User</button>
      </div>
      <my-dialog :show="isDialogVisible" @updateShow='hideDialog'>
        <user-create v-if="createOrEdit" @updateShowAfterCreate='hideDialog'></user-create>
        <user-edit v-else :userProp='setUser' @updateShowAfterUpdate='hideDialog'></user-edit>
      </my-dialog>
      <div class="list--table" v-for="(user, i) in users" :key="user._id">
        <table class="table table-hover">
          <thead>
            <tr>
              <th scope="col">{{user.id}}</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td scope="col">Name</td>
              <td>{{user.name}}</td>
            </tr>
            <tr>
              <td scope="col">Email</td>
              <td>{{user.email}}</td>
            </tr>
            <tr>
              <td scope="col">Phone</td>
              <td>{{user.phone}}</td>
            </tr>
            <tr>
              <td scope="col">Address</td>
              <td>{{user.address}}</td>
            </tr>
          </tbody>
        </table>
        <div class="div--btns">
          <div class="div__warning">
            <button class="btn btn-warning" @click="showEditDialog(user)">Edit</button>
          </div>
          <div class="div__danger">
            <button class="btn btn-danger" @click="deleteUser(user, i)">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
  import axios from "axios";
  import MyDialogVue from '../UI/MyDialog.vue'
  import UserCreate from './UserCreate.vue'
  import UserEdit from './UserEdit.vue'
  
  export default {
    name: "UserList",
    components: {
      "my-dialog": MyDialogVue,
      "user-create": UserCreate,
      "user-edit": UserEdit
    },
    data() {
      return {
        users: [],
        isDialogVisible: false,
        setUser: {},
        createOrEdit: false
      };
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
            }
          });
          this.users = response.data
        } catch (error) {
          console.error(error);
        }
      },
      showEditDialog(user){
        this.createOrEdit = false
        this.setUser = user
        this.isDialogVisible = true
      },
      showCreateDialog(){
        this.createOrEdit = true
        this.isDialogVisible = true
      },
      async hideDialog(bool){
        await this.startComponent()
        this.isDialogVisible = bool
      },
      async deleteUser(user, i){
        if (confirm("Do you really want to remove the user?")) {
          try {
            await axios.delete("http://localhost:8081/users/" + user.id);
            this.users.splice(i, 1);
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