<template>

</template>

<script>
// JiaThis 按钮自定义大全
// http://www.jiathis.com/customize
export default {
  name: 'share',
  props: {
    config: {
      type: Object,
      required: true
    },
  },
  mounted: function () {
    window.jiathis_config = Object.assign({
      url: "http://www.jiathis.com",
      summary: "分享摘要",
      title: "分享标题",
      shortUrl: false,
      hideMore: false
    }, this.config)

    if (typeof $.getScript === 'function') {
      $.getScript('http://v3.jiathis.com/code/jia.js')
    } else {
      // yarn add jquery
      // in main.js
      // import jQuery from 'jquery'
      // window.jQuery = window.jquery = window.$ = jQuery
      console.error('请先引入jquery！')
    }
  },
  computed: {

  },
  methods: {

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
