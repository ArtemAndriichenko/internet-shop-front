<template>
    <div>
      <h1>User Edit</h1>
      <form @submit.prevent="onSubmit">
        <div>
          <label>Username:</label>
          <input type="text" v-model="user.username" />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" v-model="user.password" />
        </div>
        <button type="submit">Update User</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: "UserEdit",
    data() {
      return {
        user: {
          id: 0,
          username: "",
          password: "",
        },
      };
    },
    methods: {
      fetchUser() {
        const id = this.$route.params.id;
        fetch(`/users/${id}`)
          .then((response) => response.json())
          .then((data) => (this.user = data))
          .catch((error) => console.log(error));
      },
      onSubmit() {
        const id = this.$route.params.id;
        fetch(`/users/${id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(this.user),
        })
          .then(() => this.$router.push("/users"))
          .catch((error) => console.log(error));
      },
    },
    mounted() {
      this.fetchUser();
    },
  };
  </script>