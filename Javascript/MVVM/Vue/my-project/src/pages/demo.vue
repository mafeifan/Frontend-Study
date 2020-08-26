<template>
  <div>
    <button @click="increment">
      Count is: {{ state.count }}, double is: {{ state.double }}
    </button>
  </div>
</template>
<script>
    // https://www.cnblogs.com/enoy/p/vue3.html
    import { reactive, computed } from '@vue/composition-api'

    export default {
        setup() {
            const state = reactive({
                count: 0,
                double: computed(() => state.count * 2),
            });

            function increment() {
                state.count++
            }
            // return 暴露到 template 中
            return {
                state,
                increment,
            }
        },
    }
</script>
