<template>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="id"
      label="id"
      width="180">
    </el-table-column>
    <el-table-column
      prop="=name"
      label="菜单名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="EName"
      label="英文名">
    </el-table-column>
    <el-table-column
    prop="code"
    label="排序码">
  </el-table-column>
    <el-table-column
      prop="link"
      label="外链">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态">
    </el-table-column>
    <el-table-column
      prop="deal"
      label="操作">
      <template slot-scope="scope">
        <el-button @click="edit" type="text" size="small">修改</el-button>
        <el-button @click="del" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>

export default {
  data () {
    return {
      tableData: [{
        title: '企业人工智能助理',
        id: 'eaiatemplate',
        field: '企业服务',
        icon: 'SSOC',
        status: 'share'
      }, {
        title: '社保公积金机器人',
        id: 'ssoctemplate',
        field: '企业服务',
        icon: 'SSOC',
        status: 'share'
      }]
    }
  },
  methods: {
    edit (v) {
      this.$router.push('/menu/edit')
    },
    del () {
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {

      }).catch(() => {
        return false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
