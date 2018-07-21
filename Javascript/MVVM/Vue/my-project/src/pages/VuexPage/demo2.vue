<template>
  <div class="VuexDemo">
    <ul>
      <li v-for="item in todos" :key="item.id">{{item.name}}</li>
    </ul>
    <!--<input type="text" v-model="todoItem.id">-->
    <input type="text" v-model="todoItem.name">
    <button @click="AddTodoItem(todoItem)">Add</button>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'VuexDemo2',
  components: {
  },
  created() {
    // 1. 分发 Action
    this.$store.dispatch('demo/getTodos')
  },
  data () {
    return {
      todoItem: {
        id: 0,
        name: ''
      },
    }
  },
  methods: {
    ...mapActions('demo', [
      'AddTodoItem'
    ]),
    // 下面的写法等价
    // AddTodoItem(todoItem) {
    //   this.$store.dispatch('demo/AddTodoItem', todoItem)
    // },
  },
  computed: {
    ...mapState({
      todos: state => state.demo.todos,
    }),
    // 下面的写法等价
    // todos() {
    //   return this.$store.state.demo.todos
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
