<template>
  <div>
    <h1>我是父组件的标题</h1>
    <!-- 1. 匿名插槽，注意被替换的内容 -->
    <child>
      <p>这是一些初始内容</p>
      <p>这是更多的初始内容</p>
    </child>

    <hr>
    <!-- 2. 匿名插槽，没有要分发的内容 -->
    <child></child>

    <hr>

    <child>
      <div class="tmpl" slot="up">
        <span>菜单1</span>
      </div>

      <div class="tmpl" slot="down">
        <span>菜单2</span>
      </div>
    </child>

    <hr>
    <!-- 3. 作用域插槽, 子组件提供数据，父组件提供样式 -->

    <!--第一次使用,直接显示 -->
    <childScope>
      <template slot-scope="user">
        {{user.data}}
      </template>
    </childScope>

    <!--第二次使用, 用列表显示 -->
    <childScope>
      <!-- 支持解构语法 -->
      <template slot-scope="{data}">
        <ul>
          <li v-for="item in data">{{item}}</li>
        </ul>
      </template>
    </childScope>

    <!-- 插槽组件 -->
    <!-- 父组件能接收来自子组件的slot传递过来的参数 -->
    <childScope2 :items="users" even-bg-color="#E5E9F2">
      <template slot-scope="props">
        <span>{{users[props.$index].id}}</span>
        <span>{{users[props.$index].name}}</span>
      </template>
    </childScope2>

    <hr>

  </div>
</template>

<script>
import child from './child';
import childScope from './child-scope';
import childScope2 from './child-scope2';

export default {
  name: 'SlotPage',
  data () {
    return {
      users: [
        {id: 1, name: '张三', age: 20},
        {id: 2, name: '李四', age: 22},
        {id: 3, name: '王五', age: 27},
        {id: 4, name: '张龙', age: 27},
        {id: 5, name: '赵虎', age: 27}
      ]
    }
  },
  components: {
    child,
    childScope,
    childScope2,
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
