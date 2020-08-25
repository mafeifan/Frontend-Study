<template>
  <div class="VuexDemo">
    <ul>
      <li v-for="item in todos" :key="item.id">{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'VuexDemo1',
  components: {
  },
  created() {
    // 1. 分发 Action
    this.$store.dispatch('demo/getTodos')
  },
  data () {
    return {
    }
  },
  computed: {
    todos() {
      return this.$store.state.demo.todos
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
