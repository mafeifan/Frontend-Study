<template>
  <div class="myTree">
    <h1>递归组件学习</h1>
    <ul v-for="item in menuItemsData">
      <my-tree :model="item" :key="item.menuCode"></my-tree>
    </ul>
  </div>
</template>

<script>
import myTree from '@/components/base/Tree'
import treeData from './data.json'

export default {
  name: 'TreePage',
  components: {
    myTree
  },
  data () {
    return {
      menuItemsData: treeData
    }
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
