<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" v-loading="loading">
    <el-form-item label="机器人名称" prop="BotName">
      <el-col :span="16">
        <el-input v-model="ruleForm.BotName"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="代码模版ID" prop="ID">
      <el-col :span="16">
        <el-input v-model="ruleForm.ID" :disabled="IDStatus"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="机器人类型" prop="BotType">
      <el-col :span="16">
        <el-select style="width:100%" placeholder="请选择" v-model="ruleForm.BotType">
          <el-option label="SSOC" value="SSOC">
          </el-option>
        </el-select>
      </el-col>
    </el-form-item>
    <el-form-item label="部署模式" prop="DeployModel">
      <el-col :span="16">
        <el-radio-group v-model="ruleForm.DeployModel">
          <el-radio :label="1" value="alone">独立部署</el-radio>
          <el-radio :label="2" value="share">共享部署</el-radio>
        </el-radio-group>
      </el-col>
    </el-form-item>
    <el-form-item label="自动部署" prop="IsAutoCreate">
      <el-col :span="16">
        <el-switch v-model="ruleForm.IsAutoCreate"></el-switch>
      </el-col>
    </el-form-item>
    <el-form-item label="机器人领域" prop="DomainName">
      <el-col :span="16">
        <el-select style="width:100%"  placeholder="请选择" v-model="ruleForm.DomainName" @change = 'change'>
          <el-option
            v-for="item in botDoMainOptions"
            :key="item.DomainName"
            :label="item.DomainName"
            :value="item.DomainName"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-form-item>
    <el-form-item label="机器人图标" prop="BotImage">
      <el-col :span="16">
        <el-input v-model="ruleForm.BotImage"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="体验二维码" prop="BotQRCode">
      <el-col :span="16">
        <el-input v-model="ruleForm.BotQRCode">
        </el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="描述" prop="Description">
      <el-col :span="16">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入内容"
          v-model="ruleForm.Description">
        </el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="详情" class="container" prop="BotDetail">
      <el-col :span="16">
        <quill-editor ref="myTextEditor" v-model="ruleForm.BotDetail" :options="editorOption"></quill-editor>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">{{button}}</el-button>
      <el-button @click="cancle">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
import {unhtml, htmlDecodeByRegExp, getCookies} from '../../utils/utils'
import {UPDATEBOT, ADDBOT, BOTDETAIL, USABLEDDOMAINLIST} from '../../constants/api'
import URL from '../../constants/baseUrl'
import {DEPLOYMODEL} from '../../constants/constants'
import {request} from '../../utils/server'

export default {
  data () {
    return {
      loading: false,
      IDStatus: true,
      ruleForm: {
        BotName: '',
        DomainId: '',
        DomainName: '企业服务',
        BotType: 'SSOC',
        DeployModel: 2,
        IsAutoCreate: true,
        BotImage: '',
        BotQRCode: '',
        Description: '',
        BotDetail: '',
        ID: ''
      },
      rules: {
        BotName: [
          {required: true, message: '请输入名称！', trigger: 'change'}
        ],
        DomainId: [{required: false, message: '请输入代码模版ID!', trigger: 'blur'}],
        DomainName: [{required: true, message: '请选择领域!', trigger: 'change'}],
        BotType: [{required: true, message: '请选择类型！', trigger: 'blur'}],
        DeployModel: [{required: true, message: '请选择部署模式！', trigger: 'change'}],
        IsAutoCreate: [{required: true, message: '请选择是否自动部署！', trigger: 'change'}],
        BotImage: [{required: true, message: '请输入图标地址！', trigger: 'blur'}],
        BotQRCode: [{required: false, message: '请输入二维码地址！', trigger: 'blur'}],
        Description: [{required: true, message: '请添加描述！', trigger: 'blur'}],
        BotDetail: [{required: true, message: '请添加详情！', trigger: 'blur'}],
        ID: [{required: false, message: '请添加代码模板ID！', trigger: 'blur'}]
      },
      button: '立即创建',
      editorOption: {
        placeholder: 'Hello World'
      },
      botDoMainOptions: []
    }
  },
  components: {
    quillEditor
  },
  created: function () {
    const ID = this.$route.query.ID
    const that = this
    that.getBotDomain(USABLEDDOMAINLIST, 'BotDomain')
    if (ID) {
      that.button = '立即更新'
      that.loading = true
      that.getDetail(BOTDETAIL, 'BotInfo', ID)
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
          const content = unhtml(form.BotDetail)
          const model = form.DeployModel === 2 ? 'share' : 'alone'
          const auto = form.IsAutoCreate ? 'True' : 'False'
          obj.BotDetail = content
          obj.DeployModel = model
          obj.IsAutoCreate = auto
          obj = {
            ...form,
            ...obj
          }
          const way = that.button === '立即创建' ? ADDBOT : UPDATEBOT
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
    getDetail (api, key = 'BotInfo', ID) {
      const that = this
      const url = `${api}?id=${ID}`
      request(url, key).then(
        (res) => {
          const obj = res
          obj.IsAutoCreate = !'False'
          obj.DeployModel = DEPLOYMODEL[obj.DeployModel]
          obj.BotDetail = htmlDecodeByRegExp(obj.BotDetail)
          that.ruleForm = obj
          that.loading = false
        }).catch(
        err => err
      )
    },
    updateItem (api, key = 'BotInfo', params) {
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
    getBotDomain (api, key) {
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
          that.botDoMainOptions = res[key]
          that.ruleForm.DomainName = that.botDoMainOptions[0].DomainName
          that.ruleForm.DomainId = that.botDoMainOptions[0].ID
        }
      }
      ).catch(err => err)
    },
    change (v) {
      const that = this
      that.botDoMainOptions.forEach(
        (value) => {
          if (value.DomainName === v) {
            that.ruleForm.DomainId = value.ID
          }
        }
      )
      console.log(v)
    }
  }
}
</script>
<style>
</style>
