<template>
  <li>
    <span @click="toggle">
      <i v-if="isFolder" class="icon" :class="[open ? 'fa fa-folder-open': 'fa fa-folder']"></i>
      <i v-if="!isFolder" class="icon fa fa-file-text"></i>
      {{ model.menuName }}
    </span>
    <ul v-show="open" v-if="isFolder">
      <tree-menu v-for="item in model.children" :key="item.menuCode" :model="item"></tree-menu>
    </ul>
  </li>
</template>

<script>
export default {
  name: 'treeMenu',
  props: ['model'],
  data () {
    return {
      open: false,
    }
  },
  computed: {
    isFolder: function() {
      return this.model.children && this.model.children.length
    }
  },
  methods: {
    toggle: function() {
      if (this.isFolder) {
        this.open = !this.open
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  ul {
    list-style: none;
  }
  i.icon {
    display: inline-block;
    width: 15px;
    height: 15px;
    background-repeat: no-repeat;
    vertical-align: middle;
  }
  .icon.folder {
    /*background-image: url(/src/assets/folder.png);*/
  }
  .icon.folder-open {
    /*background-image: url(/src/assets/folder-open.png);*/
  }
  .icon.file-text {
    /*background-image: url(/src/assets/file-text.png);*/
  }
  .tree-menu li {
    line-height: 1.5;
  }
</style>
