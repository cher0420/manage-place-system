<template>
  <div>
    <el-button round class="m-bottom-10" @click="create">添加</el-button>
    <table-list></table-list>
  </div>
</template>
<script>
import TableList from './TableList'
export default {
  methods: {
    create: function () {
      console.log('点击了', this.$router)
      this.$router.push({ path: '/robot/create' })
    }
  },
  components: {
    tableList: TableList
  }
}
</script>
<style lang="scss" scoped>
  @import '../../style/index';
</style>
