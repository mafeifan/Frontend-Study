<template>
  <div class="hello">
    <share :config="shareConfig" inline-template>
      <div class="jiathis_style_32x32">
        <a class="jiathis_button_tqq"></a>
        <a class="jiathis_button_cqq"></a>
        <a class="jiathis_button_qzone"></a>
        <a class="jiathis_button_tsina"></a>
        <a href="http://www.jiathis.com/share" class="jiathis jiathis_txt jiathis_separator jtico jtico_jiathis" target="_blank"></a>
        <a class="jiathis_counter_style"></a>
      </div>
    </share>
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>

import share from '@/components/base/Share'

export default {
  name: 'HelloWorld',
  data () {
    return {
      shareConfig: {
        url: 'http://www.jianshu.com',
        summary: '测试分享摘要',
        title: '测试分享标题',
        shortUrl: false,
        hideMore: false
      },
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    share
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
