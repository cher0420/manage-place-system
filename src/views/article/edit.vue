<template>
  <el-form ref="ruleForm" :model="ruleForm" :rules="rules" label-width="100px" v-loading="loading">
    <el-form-item label="标题" prop="Title">
      <el-col :span="16">
        <el-input v-model="ruleForm.Title" placeholder="请添加标题"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="分类" prop="CategoryId">
      <el-col :span="16">
        <el-select style="width:100%"  placeholder="请选择分类" v-model="ruleForm.CategoryId" @change = 'change'>
          <el-option
            v-for="item in options"
            :key="item.ID"
            :label="item.CategoryName"
            :value="item.ID"
          >
          </el-option>
        </el-select>
      </el-col>
    </el-form-item>
    <el-form-item label="内容" class="container" prop="Content">
      <el-col :span="16">
        <quill-editor ref="myTextEditor" v-model="ruleForm.Content" :options="editorOption"></quill-editor>
      </el-col>
    </el-form-item>
    <el-form-item prop = 'Status'>
      <el-col :span="16">
        <el-checkbox v-model="ruleForm.Status">可用</el-checkbox>
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
import {ADDARTICAL, ARTICALCATEGORYLIST, ARTICALDETAIL, UPDATEARTICAL} from '../../constants/api'
import {request} from '../../utils/server'

export default {
  data () {
    return {
      ruleForm: {
        Title: '',
        CategoryId: '',
        Content: '',
        Status: true
      },
      button: '立即创建',
      options: [],
      loading: false,
      rules: {
        Title: [
          {required: true, message: '请输入标题！', trigger: 'blur'}
        ],
        CategoryId: [{required: true, message: '选择分类!'}],
        Content: [{required: true, message: '请添加内容', trigger: 'blur'}],
        Status: [{required: true, message: '请选择状态!'}]
      },
      editorOption: {
        placeholder: '请添加内容'
      }
    }
  },
  components: {
    quillEditor
  },
  created: function () {
    const ID = this.$route.query.ID
    const that = this
    that.getCategory(ARTICALCATEGORYLIST, 'ContentCategoryList')
    if (ID) {
      that.button = '立即更新'
      that.loading = true
      that.getDetail(ARTICALDETAIL, 'ContentManagement', ID)
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
          const content = unhtml(form.Content)
          obj.Status = form.Status ? '1' : '0'
          obj.Content = content
          obj = {
            ...form,
            ...obj
          }
          const way = that.button === '立即创建' ? ADDARTICAL : UPDATEARTICAL
          that.updateItem(way, 'ContentManagement', obj)
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
    getDetail (api, key = 'ContentManagement', ID) {
      const that = this
      const url = `${api}?id=${ID}`
      request(url, key).then(
        (res) => {
          const obj = res
          obj.Content = htmlDecodeByRegExp(obj.Content)
          obj.Status = obj.Status === '1'
          that.ruleForm = obj
          that.loading = false
        }).catch((err) => { return err })
    },
    updateItem (api, key = 'ContentManagement', params) {
      const that = this
      const baseData = JSON.stringify(params)
      that.loading = true
      request(api, key, {body: baseData, method: 'POST'}).then(
        (res) => {
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
    getCategory (api, key) {
      const that = this
      request(api, key).then((res) => {
        const arr = []
          res.forEach(
            (v) => {
              if(v.Status === '1') {
                arr.push(v)
              }
            }
          )
        that.options = arr
        that.ruleForm.CategoryId = that.options[0].ID
      }
      ).catch(err => err)
    },
    change (v) {
      const that = this
      that.options.forEach(
        (value) => {
          if (value.CategoryName === v) {
            that.ruleForm.CategoryId = value.ID
          }
        }
      )
    }
  }
}
</script>
