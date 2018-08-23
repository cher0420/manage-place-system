<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" v-loading="loading">
    <el-form-item label="菜单名" prop="MenuName_CN">
      <el-col :span="16">
        <el-input v-model="ruleForm.MenuName_CN"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="英文名" prop="MenuName_EN">
      <el-col :span="16">
        <el-input v-model="ruleForm.MenuName_EN"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="父菜单" prop="ParentMenuId">
      <el-col :span="16">
        <el-select v-model="ruleForm.ParentMenuId" placeholder="请选择">
          <el-option
            v-for="item in options"
            :key="item.ID"
            :label="item.MenuName_CN"
            :value="item.ID">
          </el-option>
        </el-select>
      </el-col>
    </el-form-item>
    <el-form-item label="" prop="IsBlank">
      <el-col :span="16">
        <el-checkbox v-model="ruleForm.IsBlank">外链</el-checkbox>
      </el-col>
    </el-form-item>
    <el-form-item label="链接" prop="Href">
      <el-col :span="16">
        <el-input v-model="ruleForm.Href"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="图标" prop="MenuIcon">
      <el-col :span="16">
        <el-input v-model="ruleForm.MenuIcon"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="排序码" prop = 'SortCode'>
      <el-col :span="16">
        <el-input-number v-model="ruleForm.SortCode" @change="handleChange" :min="0" :max="10"></el-input-number>
      </el-col>
    </el-form-item>
    <el-form-item prop = 'IsEnabled'>
      <el-col :span="16">
        <el-checkbox v-model="ruleForm.IsEnabled">可用</el-checkbox>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">{{button}}</el-button>
      <el-button @click="cancle">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import {ADDMENU, MENUDETAIL, MENULIST, UPDATEMENU} from '../../constants/api'
import URL from '../../constants/baseUrl'
import {getCookies} from '../../utils/utils'

export default {
  data () {
    return {
      button: '立即创建',
      ruleForm: {
        MenuName_CN: '',
        MenuName_EN: '',
        ParentMenuId: 'ROOT',
        IsBlank: true,
        Href: '',
        MenuIcon: '',
        SortCode: 1,
        IsEnabled: true
      },
      loading: false,
      options: [],
      rules: {
        MenuName_CN: [
          {required: true, message: '请输入菜单名！', trigger: 'blur'}
        ],
        MenuName_EN: [{required: true, message: '请输入英文名!', trigger: 'blur'}],
        ParentMenuId: [{required: true, message: '请选择父级菜单', trigger: 'blur'}],
        IsBlank: [{type: 'boolean', required: true, message: '是否外链!', trigger: 'blur'}],
        Href: [{required: false, message: '请输入链接地址!', trigger: 'blur'}],
        MenuIcon: [{required: false, message: '请输入图标!', trigger: 'blur'}],
        SortCode: [{type: 'number', required: true, message: '请选择排序码!', trigger: 'blur'}],
        IsEnabled: [{type: 'boolean', required: false, message: '是否可用!', trigger: 'blur'}]
      },
      editorOption: {
        placeholder: 'Hello World'
      }
    }
  },
  created: function () {
    const ID = this.$route.query.ID
    const that = this
    that.getOptions(MENULIST, 'List')
    if (ID) {
      that.button = '立即更新'
      that.loading = true
      that.getDetail(MENUDETAIL, 'List', ID)
    } else {
      that.button = '立即创建'
    }
  },
  methods: {
    onSubmit (v) {
      const form = this.ruleForm
      let obj = {}
      const that = this
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          obj.IsBlank = form.IsBlank ? 'True' : 'False'
          obj.IsEnabled = form.IsEnabled ? 'True' : 'False'
          obj.SortCode = form.SortCode + ''
          obj.Status = '1'
          obj = {
            ...form,
            ...obj
          }
          const way = that.button === '立即创建' ? ADDMENU : UPDATEMENU
          that.updateItem(way, 'BotInfo', obj)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    cancle () {
      this.$confirm('确认退出?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.go(-1)
      }).catch(() => {
        return false
      })
    },
    getDetail (api, key = 'List', ID) {
      const that = this
      const url = `${URL.baseUrl + api}?id=${ID}`
      const cookie = getCookies('Access-Token')
      fetch(url, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Token': cookie
        }
      }).then(
        response => response.json()
      ).then(
        (res) => {
          const arr = res[key][0]
          arr.IsBlank = arr.IsBlank === 'True'
          arr.IsEnabled = arr.IsEnabled === 'True'
          that.ruleForm = arr
          that.loading = false
        }).catch((err) => { return err })
    },
    getOptions (api, key) {
      const that = this
      const cookie = getCookies('Access-Token')
      fetch(URL.baseUrl + api, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Token': cookie
        }
      }).then((response) => {
        return response.json()
      }).then((res) => {
        if (res.Status) {
          const ArrItem = [{ID: 'ROOT', MenuName_CN: 'ROOT'}]
          that.options = [...res[key], ...ArrItem]
        }
      }
      ).catch(err => err)
    },
    updateItem (api, key = 'List', params) {
      const that = this
      const baseData = JSON.stringify(params)
      that.loading = true
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
      ).then((response) => {
        return response.json()
      }).then(
        (res) => {
          that.loading = true
          if (res.Status) {
            that.$message({
              message: '创建成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                that.$router.go(-1)
              }
            })
          } else {
            that.$message({
              message: '创建失败,尝试更改领域名称',
              type: 'error',
              duration: 1000,
              onClose: () => {
                that.loading = false
              }
            })
          }
        }
      ).catch(
        err => err
      )
    },
    handleChange (v) {
      console.log(v)
    }
  }
}
</script>
