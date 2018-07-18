<template>
  <div class="hello">
    <input type="text" v-model="firstName">
    <input type="text" v-model="lastName">
    <input type="text" v-model="fullName">
  </div>
</template>

<script>
export default {
  name: 'WatchPage',
  data () {
    return {
      firstName: 'Jack',
      lastName: 'London',
    }
  },
  computed: {
    fullName: function () {
      return this.firstName + ' ' + this.lastName
    }
  },
  watch: {
    firstName: function(newVal, oldVal) {
      console.log(newVal + ' ' + oldVal)
    }
  },
  components: {
  }
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
