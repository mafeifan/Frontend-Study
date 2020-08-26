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
    import route from './router'
    export default {
        name: 'app',
        data() {
            return {
                menus: route.options.routes
            }
        }
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
