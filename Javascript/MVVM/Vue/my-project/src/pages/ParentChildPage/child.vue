<template>
  <div class="child">
    <div>{{data}}</div>
    <button @click="setData('from child')">load</button>
  </div>
</template>

<script>

export default {
  name: 'Child',
  props: {
    getDataFunc: {
      require: true
    },
    setDataFunc: {
      require: true
    }
  },
  data () {
    return {
      data: ''
    }
  },
  mounted () {
    this.data = this.getDataFunc()
  },
  methods: {
    // 直接掉prop的方法，也就是父组件的方法
    setData(param) {
      this.setDataFunc(param)
    }
  },
  components: {
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
