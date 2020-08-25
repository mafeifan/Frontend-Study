<template>
  <div>
    <Top title="Cnode客户端" color="red" />
    <Search />
    <Panel />
  </div>
</template>

<script>
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
    }
</script>
