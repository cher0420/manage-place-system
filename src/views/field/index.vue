<template>
  <div>
    <el-button round class="m-bottom-10" @click="create">添加</el-button>
    <table-list></table-list>
  </div>
</template>
<script>
import TableList from './FieldTableList'
export default {
  methods: {
    create: function () {
      this.$router.push({ path: '/field/create' })
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
