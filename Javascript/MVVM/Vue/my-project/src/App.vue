<template>
  <div id="app">
    <router-link to="/tree">Tree</router-link>
    <router-link to="/parent-child">Parent child</router-link>
    <router-link to="/vuex">Vuex</router-link>
    <router-link to="/slot">slot</router-link>
    <router-link to="/composition-api">composition-api</router-link>
<!--    <router-link to="/watch">watch</router-link>-->
    <div>
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#app a {
  font-size: 1rem;
  text-decoration: none;
}
</style>
