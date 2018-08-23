<template>
      <el-menu
        :default-active="activeKey"
        class="yoy-slide-bar"
        @open="handleOpen"
        @close="handleClose"
        background-color="#0C2150"
        text-color="#fff"
        active-text-color="#7895D5"
      >
        <el-menu-item v-for="item in menu" :index="item.id" @click="go({navText: item.name},item.path)" :key="item.id">
          <i :class="item.icon"></i>
          <span slot="title" class='m-left-5'>{{item.name}}</span>
        </el-menu-item>
      </el-menu>
</template>
<script>
import store from '../../../../store'
import {REPLACE} from '../../../../store/mutation-types'
import {navTextObj} from '../../../../constants/constants'

export default {
  data () {
    return {
      menu: store.state.app.menu
    }
  },
  computed: {
    activeKey () {
      return store.state.app.active
    }
  },
  created: function () {
    const name = this.$route.name
    store.dispatch(REPLACE, {active: navTextObj[name].active})
  },
  methods: {
    go (obj, path) {
      store.dispatch(REPLACE, obj)
        .then(
          () => {
            this.$router.push(path)
          }).catch(err => err)
    },
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>
<style lang="scss" scoped>
  .m-left-5{
    margin-left:5px;
  }
  .yoy-slide-bar{
    height:100%;
    min-width: 120px;
  }
</style>
<style lang="scss">
  @import "../../../../style/index";
  .yoy-slide-bar>.is-active::before{
    display: inline-block;
    content: '';
    width: 4px;
    height: 42px;
    position: absolute;
    left: 4px;
    margin-top: 7px;
    background:$primary-special-color;
  }
</style>
