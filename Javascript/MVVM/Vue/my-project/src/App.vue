<template>
  <div id="app">
    <div class="header">
      <router-link :to="item.path" v-for="item in menus" :key="item.path">{{item.name}} | </router-link>
    </div>
    <div>
      <router-view/>
    </div>
  </div>
</template>

<script>
    import { provide, reactive } from "@vue/composition-api";
    import route from './router'
    export default {
        name: 'app',
        setup(props, context) {
          provide("_Title", "我是父组件向子组件传递的值");
          const state = reactive({
            menus: route.options.routes
          })
          return {
            ...state
          }
        },
    }
</script>

<style lang="stylus">
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    .header {
      padding: 10px;
    }
    a {
      font-size: 1rem;
      text-decoration: none;
    }
  }
</style>
