<template>
  <el-container>
        <el-aside width="200">
          <slide-bar></slide-bar>
        </el-aside>
    <el-container class="min-height-full">
        <el-header class="b-bottom"><nav-bar></nav-bar></el-header>
        <el-main><app-main></app-main></el-main>
        <el-footer><footer-bar></footer-bar></el-footer>
    </el-container>
  </el-container>
</template>

<script>
import { NavBar, SlideBar, AppMain, FooterBar } from './component'
import store from '../../store'
import {REPLACE} from '../../store/mutation-types'
import {navTextObj} from '../../constants/constants'

export default {
  name: 'Layout',
  components: {
    NavBar,
    AppMain,
    SlideBar,
    FooterBar
  },
  created: function () {
    const name = this.$route.name
    store.dispatch(REPLACE, {navText: navTextObj[name].text})
  },
  methods: {
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
  @import '../../style/index';
  .min-height-full{
    min-height: 100vh;
  }
</style>
