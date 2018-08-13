<template>
    <el-row class="yoy-nav-header padding-left-20 padding-right-20">
      <el-col :span="12">{{navText}}</el-col>
      <el-col :span="12" class="text-right">
        <el-dropdown  @command="handleCommand">
          <span class="el-dropdown-link">
            我的<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
    </el-row>
</template>
<script>
import {removeCookies, getCookies} from '../../../../utils/utils'
import store from '../../../../store'

export default {
  name: 'Navbar',
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  computed: {
    navText () {
      return store.state.app.navText
    },
    breadcrumb () {
      return store.state.app.breadcrumb
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    handleCommand (callback) {
      const that = this
      removeCookies(['username', 'password']).then(() => {
        console.log('完成')
        console.log(getCookies('username'))
        that.$router.push(
          '/login'
        )
      }).catch((err) => { return err })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../../../../style/index';
  .yoy-nav-header{
    padding-left:20px;
    height:$rowHeight;
    line-height:$rowHeight;
  }
</style>
