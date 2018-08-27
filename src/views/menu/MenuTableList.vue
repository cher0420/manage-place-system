<template>
  <el-table
    v-loading="loading"
    :data="tableData"
    stripe
    style="width: 100%">
    <el-table-column
      prop="ID"
      label="ID"
      width="180">
    </el-table-column>
    <el-table-column
      prop="MenuName_CN"
      label="菜单名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="MenuName_EN"
      label="英文名">
    </el-table-column>
    <el-table-column
    prop="SortCode"
    label="排序码">
  </el-table-column>
    <el-table-column
      prop="IsBlank"
      label="外链">
      <template slot-scope="scope">
        <div>{{scope.row.IsBlank === 'True'?'外链':'无'}}</div>
      </template>
    </el-table-column>
    <el-table-column
      prop="Status"
      label="状态">
      <template slot-scope="scope">
        <div>{{scope.row.IsEnabled === 'True'?'可用':'不可用'}}</div>
      </template>
    </el-table-column>
    <el-table-column
      prop="deal"
      label="操作">
      <template slot-scope="scope">
        <el-button @click="edit(scope.row.ID)" type="text" size="small">修改</el-button>
        <el-button @click="deleteItem(scope.row.ID)" type="text" size="small">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
import {getList, request} from '../../utils/server'
import {MENULIST, DELETEMENU} from '../../constants/api'
import store from '../../store'
import {REPLACE} from '../../store/mutation-types'

export default {
  data () {
    return {
    }
  },
  computed: {
    tableData () {
      return store.state.app.tableData
    },
    loading () {
      return store.state.app.loading
    }
  },
  beforeCreate: function () {
    getList(MENULIST, 'List')
  },
  methods: {
    edit (v) {
      this.$router.push({path: '/menu/edit', query: { ID: v }})
    },
    deleteItem (v) {
      this.$confirm('确定是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        store.dispatch(REPLACE, {loading: true})
        this.del(DELETEMENU, null, {ID: v})
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    del (api, key, params) {
      const baseData = JSON.stringify(params)
      request(api, key,
        {
          method: 'POST',
          body: baseData
        }
      ).then((res) => {
        this.$message({
          type: 'success',
          message: '删除成功!',
          duration: 1000,
          onClose: () => {
            getList(MENULIST, 'List')
          }
        })
      }
      ).catch(
        err => this.$message({
          type: 'error',
          message: `${err.ErrorCodes[0].ErrorMessage}`
        })
      )
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
