<template>
  <table>
    <!-- 表头接收两种方式，一种是传入header参数，一种是slot -->
    <thead v-if="header && header.length">
      <tr>
        <th v-for="(item, index) in header">{{ item }}</th>
      </tr>
    </thead>
    <slot name="header" v-else></slot>
    <slot name="body"></slot>
    <!--<slot :data="tableData"></slot>-->
  </table>
</template>

<script>
export default {
  props: {
    /*
     * header 表格头
     * */
    header: {
      type: Array,
      default: () => []
    },
    /*
     * items 行
     * */
    rows: {
      type: Array,
      default: () => []
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
