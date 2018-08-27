<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" v-loading="loading">
    <el-form-item label="领域名称" prop="DomainName">
      <el-col :span="16">
        <el-input v-model="ruleForm.DomainName" placeholder="请输入领域名称"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="领域图标" prop="DomainIcon">
      <el-col :span="16">
        <el-input v-model="ruleForm.DomainIcon" placeholder="请输入图片链接地址，例如：https://hightalkmarketstoretest.blob.core.windows.net/xxxx.png"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="展示图" prop="DomainImage">
      <el-col :span="16">
        <el-input v-model="ruleForm.DomainImage" placeholder="请输入图片链接地址，例如：https://hightalkmarketstoretest.blob.core.windows.net/xxxx.png"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="领域描述" prop="Description">
      <el-col :span="16">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入领域描述"
          v-model="ruleForm.Description">
        </el-input>
      </el-col>
    </el-form-item>
    <el-form-item prop="IsCommon">
      <el-col :span="16">
        <el-checkbox v-model="ruleForm.IsCommon">常用领域</el-checkbox>
      </el-col>
    </el-form-item>
    <el-form-item prop="Status">
      <el-col :span="16">
        <el-checkbox v-model="ruleForm.Status">是否可用</el-checkbox>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">{{button.name}}</el-button>
      <el-button @click="cancle">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import {ADDBOTDOMAIN, BOTDOMAINDETAIL, UPDATEBOTDOMAIN} from '../../constants/api'
import {request} from '../../utils/server'

export default {
  data () {
    return {
      loading: false,
      ruleForm: {
        DomainName: '',
        DomainImage: '',
        DomainIcon: '',
        Description: '',
        IsCommon: true,
        Status: true
      },
      rules: {
        DomainName: [
          {type: 'string', required: true, message: '请输入名称！', trigger: 'blur'}
        ],
        DomainImage: [{required: true, message: '请输入图片链接地址！例如：https://hightalkmarketstoretest.blob.core.windows.net/img/domain_icon/icon.png', trigger: 'blur'}],
        DomainIcon: [{required: true, message: '请输入图标的链接地址！例如：https://hightalkmarketstoretest.blob.core.windows.net/img/domain_icon/icon.png', trigger: 'blur'}],
        Description: [{required: true, message: '请输入描述！', trigger: 'blur'}],
        IsCommon: [{type: 'boolean'}],
        Status: [{type: 'boolean'}]
      },
      editorOption: {
        placeholder: 'Hello World'
      },
      button: {
        name: '立即创建',
        feature: 'edit'
      }
    }
  },
  created: function () {
    const ID = this.$route.query.ID
    const that = this
    const feature = ID ? 'edit' : 'create'
    that.button = feature === 'create' ? {name: '立即创建', feature: 'create'} : {name: '立即更新', feature: 'edit'}
    if (feature === 'edit') {
      that.loading = true
      that.getDetail(BOTDOMAINDETAIL, 'BotDomain', ID)
    }
  },
  methods: {
    onSubmit (v) {
      const form = this.ruleForm
      let obj = {}
      const that = this
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          const isCommonvalue = form.IsCommon ? '1' : '0'
          const statusValue = form.Status ? '1' : '0'
          obj.IsCommon = isCommonvalue
          obj.Status = statusValue
          obj = {
            ...form,
            ...obj
          }
          const way = that.button.feature === 'create' ? ADDBOTDOMAIN : UPDATEBOTDOMAIN
          that.updateItem(way, 'BotDomain', obj)
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
    getDetail (api, key = 'BotDomain', ID) {
      const that = this
      const url = `${api}?id=${ID}`
      request(url, key).then(
        (res) => {
          const arr = res[0]
          arr.IsCommon = arr.IsCommon === '1'
          arr.Status = arr.Status === '1'
          that.ruleForm = arr
          that.loading = false
        }
      ).catch(err => err)
    },
    updateItem (api, key = 'BotDomain', params) {
      const that = this
      const baseData = JSON.stringify(params)
      that.loading = true
      const option = {
        method: 'POST',
        body: baseData
      }
      request(api, key = null, option).then(
        (res) => {
          console.log(res)
          that.loading = true
          if (res.Status) {
            that.$message({
              message: '创建成功',
              type: 'success',
              duration: 1000,
              onClose: () => {
                that.loading = false
                that.$router.go(-1)
              }
            })
          }
        }).catch(err => err)
    }
  }
}
</script>
<style lang="scss">
  @import '../../style/index';
</style>
