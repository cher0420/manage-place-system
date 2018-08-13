<template>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="name"
      label="机器人名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="id"
      label="代码模版ID"
      width="180">
    </el-table-column>
    <el-table-column
      prop="field"
      label="领域">
    </el-table-column>
    <el-table-column
      prop="type"
      label="类型">
    </el-table-column>
    <el-table-column
    prop="mode"
    label="部署模式">
    </el-table-column>
    <el-table-column
      prop="auto"
      label="自动部署">
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
  name: 'tableList',
  data () {
    return {
      tableData: [{
        name: '企业人工智能助理',
        id: 'eaiatemplate',
        field: '企业服务',
        type: 'SSOC',
        mode: 'share',
        auto: false
      }, {
        name: '社保公积金机器人',
        id: 'ssoctemplate',
        field: '企业服务',
        type: 'SSOC',
        mode: 'share',
        auto: true
      }]
    }
  },
  methods: {
    edit (v) {
      this.$router.push('/robot/edit')
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
</style>
