<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" v-loading="loading">
    <el-form-item label="机器人名称" prop="BotName">
      <el-col :span="16">
        <el-input v-model="ruleForm.BotName" placeholder="请输入机器人名称"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="代码模版ID" prop="ID">
      <el-col :span="16">
        <el-input v-model="ruleForm.ID" :disabled="IDStatus"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="机器人类型" prop="BotType">
      <el-col :span="16">
        <el-select style="width:100%" placeholder="请选择机器人类型" v-model="ruleForm.BotType" >
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
        <el-select style="width:100%"  placeholder="请选择机器人领域" v-model="ruleForm.DomainName" @change = 'change'>
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
        <el-input v-model="ruleForm.BotImage" placeholder="请输入机器人图标链接地址，例如：https://hightalkmarketstoretest.blob.core.windows.net/xxxx.png"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="体验二维码" prop="BotQRCode">
      <el-col :span="16">
        <el-input v-model="ruleForm.BotQRCode"  placeholder="请输入体验二维码链接地址，例如：https://hightalkmarketstoretest.blob.core.windows.net/xxxx.png">
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
import {unhtml, htmlDecodeByRegExp} from '../../utils/utils'
import {UPDATEBOT, ADDBOT, BOTDETAIL, USABLEDDOMAINLIST} from '../../constants/api'
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
        BotImage: [{required: true, message: '请输入图标链接地址！例如：https://hightalkmarketstoretest.blob.core.windows.net/img/domain_icon/icon.png', trigger: 'blur'}],
        BotQRCode: [{required: false, message: '请输入二维码链接地址！例如：https://hightalkmarketstoretest.blob.core.windows.net/img/domain_icon/icon.png', trigger: 'blur'}],
        Description: [{required: true, message: '请添加描述！', trigger: 'blur'}],
        BotDetail: [{required: true, message: '请添加详情！', trigger: 'blur'}],
        ID: [{required: false, message: '请添加代码模板ID！', trigger: 'blur'}]
      },
      button: '立即创建',
      editorOption: {
        placeholder: '请添加内容'
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
      request(api, key,
        {
          method: 'POST',
          body: baseData
        }
      ).then(
        (res) => {
          that.loading = true
          that.$message({
            message: '创建成功',
            type: 'success',
            duration: 1000,
            onClose: () => {
              that.$router.go(-1)
            }
          })
        }
      ).catch(
        err => that.$message({
          message: `${err.ErrorCodes[0].ErrorMessage}`,
          type: 'error',
          duration: 1000,
          onClose: () => {
            that.loading = false
          }
        })
      )
    },
    getBotDomain (api, key) {
      const that = this
      request(api, key).then((res) => {
        const arr = []
        res.forEach(
          (v) => {
            if (v.Status === '1') {
              arr.push(v)
            }
          }
        )
        that.botDoMainOptions = arr
        that.ruleForm.DomainName = that.botDoMainOptions[0].DomainName
        that.ruleForm.DomainId = that.botDoMainOptions[0].ID
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
