<template>
  <div>
    <!-- 作用域插槽 -->
    <slot :data="nameList"></slot>
  </div>
</template>

<script>
export default {
  name: 'child-scope',
  data () {
    return {
      nameList: ['zhangsan','lisi','wanwu','zhaoliu','tianqi','xiaoba']
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
