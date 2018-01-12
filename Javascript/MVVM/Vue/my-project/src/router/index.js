import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

function load(component) {
  // '@' is aliased to src/components
  return () => import(`@/pages/${component}/index.vue`)
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: load('HelloPage')
    },
    {
      path: '/tree',
      name: 'TreePage',
      component: load('TreePage')
    },
    {
      path: '/parent-child',
      name: 'ParentChildPage',
      component: load('ParentChildPage')
    }
  ]
})
