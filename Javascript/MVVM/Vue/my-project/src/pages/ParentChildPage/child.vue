<template>
  <div class="child" style="border: 1px dotted red">
    <div>{{data}}</div>
    <button @click="setData('from child')">load</button>
    <input type="text" @input="handleOuter" v-model="innerText">
    <div>等待被内部组件修改</div>
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
      data: '',
      innerText: '',
    }
  },
  mounted () {
    this.data = this.getDataFunc();
  },
  methods: {
    // 直接调用prop的方法，也就是父组件的方法
    setData(param) {
      this.setDataFunc(param);
    },
    handleOuter(e) {
      console.log(e);
      this.$emit('update:outer', this.innerText);
    },
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
