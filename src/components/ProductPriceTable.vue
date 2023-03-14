<template>
  <div class="order-price-list">
    <div>
      <h2>Maximum number of purchases</h2>
    </div>
    <div class="list--table">
      <table class="table table-hover">
        <thead>
          <tr class="table-info">
            <th>id</th>
            <td>Name</td>
            <td>Price</td>
            <td>Count</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>{{productsMax.id}}</th>
            <td>{{productsMax.name}}</td>
            <td>{{productsMax.price}}</td>
            <td>{{productsMax.count}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div>
      <h2>Minimum number of purchases</h2>
    </div>
    <div class="list--table">
      <table class="table table-hover">
        <thead>
          <tr class="table-info">
            <th>id</th>
            <td>Name</td>
            <td>Price</td>
            <td>Count</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>{{productsMin.id}}</th>
            <td>{{productsMin.name}}</td>
            <td>{{productsMin.price}}</td>
            <td>{{productsMin.count}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "product-price-table",
  data() {
    return {
      productsMin: [],
      productsMax: []
    }
  },
  async mounted() {
    this.startComponent()
  },
  methods: {
    async startComponent(){
      try {
        const response = await axios.get("http://localhost:8081/minProduct", {
          headers: {
            Accept: "application/json",
          }
        });
        this.productsMin = response.data
        console.log(this.productsMin)
      } catch (error) {
        console.error(error);
      }

      try {
        const response = await axios.get("http://localhost:8081/maxProduct", {
          headers: {
            Accept: "application/json",
          }
        });
        this.productsMax = response.data
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>

<style scoped>
.list--table{
  margin: 30px;
}
.table{
  font-size: 18px;
  border: 1px solid black;
}
td{
  padding-top: 15px;
  padding-bottom: 15px;
  word-wrap: break-word;
}
h2{
  margin-top: 30px;
  text-align:center
}
</style>