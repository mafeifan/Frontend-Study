<template>
  <h3 :style="{
    backgroundColor: color ? color : defaultColor
  }">{{customVal}}</h3>
</template>
<script>
    import { reactive, inject  } from "@vue/composition-api";
    export default {
        name: 'top',
        // 父组件传递进来更改该头部组件的属性值
        props: {
            // 标题
            title: String,
            // 颜色
            color: String
        },
        setup(props, context) {
            const customVal = inject("_Title");
            console.log(props);
            console.log(context);
            const state = reactive({
                defaultColor: "red"
            });
            return {
                customVal,
                ...state
            };
        }
    };
</script>
<style scoped>
  header {
    height: 50px;
    width: 100%;
    line-height: 50px;
    text-align: center;
    color: white;
  }
</style>
