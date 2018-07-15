<template>
  <div>
    <h2>我是子组件的标题</h2>
    <slot>
      只有在没有要分发的内容时才会显示。
    </slot>

    <slot name="up"></slot>

    <slot name="down"></slot>

  </div>
</template>

<script>


export default {
  name: 'child',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
