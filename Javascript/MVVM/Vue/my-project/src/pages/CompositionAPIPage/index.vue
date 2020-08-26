<template>
  <div>
    <Top title="Cnode客户端" color="red" />
    <Search />
    <Panel />
  </div>
</template>

<script>
    import { inject } from "@vue/composition-api";
    // https://composition-api.vuejs.org/zh
    // https://github.com/Wscats/vue-cli
    import Top from "./top";
    import Search from "./search";
    import Panel from "./panel";
    export default {
        components: {
            Top,
            Search,
            Panel,
        },
        setup() {
          // provide('数据名称', 要传递的数据)
        }
    }
</script>
