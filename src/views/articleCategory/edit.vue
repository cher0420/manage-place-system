<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" v-loading="loading">
    <el-form-item label="ID" prop="ID">
      <el-col :span="16">
        <el-input v-model="ruleForm.ID" :disabled="IDStatus"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="分类名称" prop="CategoryName">
      <el-col :span="16">
        <el-input v-model="ruleForm.CategoryName" placeholder="请添加分类名称"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item prop = 'Status'>
      <el-col :span="16">
        <el-checkbox v-model="ruleForm.Status">可用</el-checkbox>
      </el-col>
    </el-form-item>
    <!--<el-form-item label="内容" class="container" prop="content">-->
      <!--<el-col :spam="16">-->
        <!--<quill-editor ref="myTextEditor" v-model="ruleForm.content" :options="editorOption"></quill-editor>-->
      <!--</el-col>-->
    <!--</el-form-item>-->
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
import {ADDARTICALCATEGORY, UPDATEARTICALCATEGORY, ARTICALCATEGORYDETAIL} from '../../constants/api'
import {request} from '../../utils/server'

export default {
  data () {
    return {
      ruleForm: {
        ID: '',
        CategoryName: '',
        // content: ''
        Status: true
      },
      rules: {
        ID: [
          {required: false, message: '请输入ID！', trigger: 'blur'}
        ],
        CategoryName: [{required: false, message: '请选择分类!'}],
        Status: [{required: true, message: '请选择状态!'}]
        // content: [{required: true, message: '请添加内容', trigger: 'blur'}]
      },
      button: '立即创建',
      loading: false,
      IDStatus: true,
      editorOption: {
        placeholder: 'Hello World'
      }
    }
  },
  components: {
    quillEditor
  },
  created: function () {
    const ID = this.$route.query.ID
    const that = this
    if (ID) {
      that.button = '立即更新'
      that.loading = true
      that.getDetail(ARTICALCATEGORYDETAIL, 'ContentCategoryList', ID)
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
          form.Status = form.Status ? '1' : '0'
          obj = {
            ...form,
            ...obj
          }
          const way = that.button === '立即创建' ? ADDARTICALCATEGORY : UPDATEARTICALCATEGORY
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
    getDetail (api, key = 'ContentCategoryList', ID) {
      const that = this
      const url = `${api}?id=${ID}`
      request(url, key).then(
        (res) => {
          const obj = res[0]
          obj.Status = obj.Status === '1'
          that.ruleForm = obj
          that.loading = false
        }).catch((err) => { return err })
    },
    updateItem (api, key = 'ContentCategoryList', params) {
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
          duration: 2000,
          onClose: () => {
            that.loading = false
          }
        })
      )
    }
  }
}
</script>
