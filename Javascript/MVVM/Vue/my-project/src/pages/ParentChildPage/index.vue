<template>
  <div class="myTree">
    <h1>父子组件数据传递</h1>
    <h3>Parent:</h3>
    <div>{{ data }}</div>
    <h3>Child:</h3>
    <i-child :get-data-func="getData" :set-data-func="setData" />
  </div>
</template>

<script>

import Child from './child';

export default {
  name: 'Parent',
  components: {
    'i-child': Child
  },
  data () {
    return {
      data: 'Parent component'
    }
  },
  methods: {
    getData: function () {
      return this.data
    },
    setData: function (value) {
      this.data = value
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
