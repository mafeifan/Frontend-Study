<template>
  <div class="pageVuex">
    <!-- 例子1 -->
    <VuexDemo1></VuexDemo1>
    <!-- 例子2 语法糖 -->
    <VuexDemo2></VuexDemo2>
    <hr>
    <h1>Shopping Cart Example</h1>
    <hr>
    <h2>Products</h2>
    <ProductList/>
    <hr>
    <ShoppingCart/>
  </div>
</template>

<script>
import Vue from 'vue'
import VuexDemo1 from './demo1'
import VuexDemo2 from './demo2'
import ProductList from './ProductList'
import ShoppingCart from './ShoppingCart'
import { currency } from './filter/currency'
Vue.filter('currency', currency)

export default {
  name: 'VuexPage',
  components: {
    VuexDemo1,
    VuexDemo2,
    ProductList,
    ShoppingCart
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
html, body {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  color: #2c3e50;
}
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
  line-height: 1.5em;
  padding-left: 1.5em;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #7f8c8d;
  text-decoration: none;
}
a:hover {
  color: #4fc08d;
}
</style>
