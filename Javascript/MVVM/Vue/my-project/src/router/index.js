import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

function load(component) {
  // '@' is aliased to src/components
  return () => import(`@/pages/${component}/index.vue`)
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
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
    },
    {
      path: '/slot',
      name: 'SlotPage',
      component: load('SlotPage')
    },
    {
      path: '/watch',
      name: 'WatchPage',
      component: load('WatchPage')
    },
    {
      path: '/vuex',
      name: 'VuexPage',
      component: load('VuexPage')
    },
    {
      path: '/composition-api',
      name: 'CompositionAPIPage',
      component: load('CompositionAPIPage')
    },
    {
      path: '/dialog',
      name: 'DialogPromisePage',
      component: load('DialogPromisePage')
    },
    {
      path: '/mqtt',
      name: 'MQTTPage',
      component: load('MQTTPage')
    },
  ]
})
