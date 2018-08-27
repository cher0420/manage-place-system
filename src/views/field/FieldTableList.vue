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
      prop="DomainName"
      label="领域名称"
      width="180">
    </el-table-column>
    <el-table-column
      prop="DomainIcon"
      label="图标">
      <template slot-scope="scope">
        <el-popover trigger="hover" placement="top">
          <p>{{ scope.row.DomainIcon }}</p>
          <div slot="reference" class="name-wrapper">
            <img class='yoy-img' size="medium" :src="scope.row.DomainIcon">
          </div>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column
      prop="IsCommon"
      label="常用领域">
      <template slot-scope="scope">
        <div>{{scope.row.IsCommon === '1'?'是':'否'}}</div>
      </template>
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
import store from '../../store'
import {getList, request} from '../../utils/server'
import {BOTDOMAINLIST, DELETEBOTDOMAIN} from '../../constants/api'
import URL from '../../constants/baseUrl'
import {REPLACE} from '../../store/mutation-types'
import {getCookies} from '../../utils/utils'

export default {
  data () {
    return {
      // loading: store.state.app.loading
    }
  },
  created: function () {
    getList(BOTDOMAINLIST, 'BotDomain')
  },
  computed: {
    tableData () {
      return store.state.app.tableData
    },
    loading () {
      return store.state.app.loading
    }
  },
  methods: {
    edit (v) {
      this.$router.push({path: '/field/edit', query: {ID: v}})
    },
    deleteItem (v) {
      this.$confirm('确定是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.del(DELETEBOTDOMAIN, {ID: v})
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    del (api, params) {
      const baseData = JSON.stringify(params)
      const option = {
        method: 'POST',
        body: baseData
      }
      request(api, null, option).then(
        (res) => {
          store.dispatch(REPLACE, {loading: true})
          this.$message({
            type: 'success',
            message: '删除成功!',
            duration: 1000,
            onClose: () => {
              getList(BOTDOMAINLIST, 'BotDomain')
            }
          })
        }
      ).catch((err) => {
        this.$message({
          type: 'error',
          message: `${err.ErrorCodes[0].ErrorMessage}`
        })
      })
    }
  }
}
</script>
<style lang="scss" scoped>
  @import '../../style/index';
  .yoy-img{
    width: 35px;
    background: $primary-color;
    padding: 5px;
    border-radius: 4px;
    height: 35px;
    box-sizing: border-box;
  }
</style>
