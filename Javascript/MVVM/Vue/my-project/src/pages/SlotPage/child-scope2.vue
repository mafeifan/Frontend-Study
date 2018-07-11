<template>
  <div>
    <div v-for="(item, index) in items" style="line-height:2.2;"
         :style="index % 2 === 0 ? 'background:'+ oddBgColor : 'background:'+ evenBgColor">
      <!-- slot的$index可以传递到父组件中 -->
      <slot :$index="index"></slot>
    </div>
  </div>
</template>

<script>
// 插槽组件
// 条纹相间列表组件
export default {
  name: 'child-scope2',
  props: {
    items: Array,
    oddBgColor: {
      type: String,
      default: '#D3DCE6'
    },
    evenBgColor: {
      type: String,
      default: '#E5E9F2'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
