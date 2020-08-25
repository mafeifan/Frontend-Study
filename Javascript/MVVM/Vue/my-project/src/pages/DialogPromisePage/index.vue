<template>
  <div class="">
    <van-button type="primary" @click="openDialog">Primary</van-button>
    <van-dialog v-model="show" title="Title" show-cancel-button>
      <img src="https://img.yzcdn.cn/vant/apple-3.jpg" width="50%" />
    </van-dialog>
  </div>
</template>

<script>
    export default {
        name: 'DialogPromise',
        components: {},
        data() {
            return {
                show: false
            }
        },
        methods: {
            openDialog() {
                this.show = true;
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
