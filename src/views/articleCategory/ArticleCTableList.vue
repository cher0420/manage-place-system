<template>
  <el-table
    :data="tableData"
    stripe
    style="width: 100%"
    v-loading="loading"
  >
    <el-table-column
      prop="ID"
      label="ID"
      width="180">
    </el-table-column>
    <el-table-column
      prop="CategoryName"
      label="分类名称">
    </el-table-column>
    <el-table-column
      prop="Status"
      label="状态">
      <template slot-scope="scope">
        <div>{{scope.row.Status === '1'?'可用':'不可用'}}</div>
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
import {getList} from '../../utils/server'
import {ARTICALCATEGORYLIST, DELETEARTICALCATEGORY} from '../../constants/api'
import store from '../../store'
import {REPLACE} from '../../store/mutation-types'
import URL from '../../constants/baseUrl'
import {getCookies} from '../../utils/utils'

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
    getList(ARTICALCATEGORYLIST, 'ContentCategoryList')
  },
  methods: {
    edit (v) {
      this.$router.push({path: '/articleCategory/edit', query: { ID: v }})
    },
    deleteItem (v) {
      this.$confirm('确定是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.del(DELETEARTICALCATEGORY, {ID: v})
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    del (api, params) {
      const baseData = JSON.stringify(params)
      const cookie = getCookies('Access-Token')
      fetch(URL.baseUrl + api,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Access-Token': cookie
          },
          body: baseData
        }
      ).then(
        response => response.json()
      ).then((res) => {
        if (res.Status) {
          store.dispatch(REPLACE, {loading: true})
          this.$message({
            type: 'success',
            message: '删除成功!',
            duration: 1000,
            onClose: () => {
              getList(ARTICALCATEGORYLIST, 'ContentCategoryList')
            }
          })
        } else {
          this.$message({
            type: 'error',
            message: '删除失败!'
          })
        }
      }
      ).catch(
        err => err
      )
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
