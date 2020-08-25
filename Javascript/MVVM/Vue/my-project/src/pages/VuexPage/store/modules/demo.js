export default {
  /*
  *  不加这个执行 this.$store.dispatch('demo/getTodos')
  *  会报 [vuex] unknown action type: demo/getTodos
  * */
  namespaced: true,
  // mutation -> state -> render
  state:{
    todos: []
  },

  // 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。
  // 只能是同步操作
  // action -> commit -> mutation
  mutations: {
    get_todo_list(state, data) {
      state.todos = data;
    },
    add_todo_item(state, item) {
      state.todos.push(item)
    }
  },

  // Action 提交的是 mutation，而不是直接变更状态。
  // 可以包含任意异步操作, 从后端获取数据
  // vue -> dispatch -> action
  actions: {
    getTodos ({ commit }) {
      // 这里用 setTimeout 模拟异步，实际可以是http请求，如 Vue.$get('/api/todolist')
      setTimeout(() => {
        commit('get_todo_list', [{id:1, name: "finley1"}, {id:2, name: "jack1"}, {id:3, name: "wang1"}])
      }, 1000)
    },
    addTodoItem({state, commit}, item) {
      let nextMaxId = state.todos.length + 1
      commit('add_todo_item', {
        id: nextMaxId,
        name: item.name
      });
    }
  }
}
