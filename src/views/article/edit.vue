<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="100px">
    <el-form-item label="标题" prop="title">
      <el-col :span="16">
        <el-input v-model="form.title"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="分类" prop="type">
      <el-col :span="16">
        <el-input v-model="form.type"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="内容" class="container" prop="content">
      <el-col :span="16">
        <quill-editor ref="myTextEditor" v-model="form.content" :options="editorOption"></quill-editor>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
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
export default {
  data () {
    return {
      form: {
        title: '',
        type: '',
        content: ''
      },
      rules: {
        title: [
          {required: true, message: '请输入标题！', trigger: 'blur'}
        ],
        type: [{required: false, message: '选择分类!'}],
        content: [{required: true, message: '请添加内容', trigger: 'blur'}]
      },
      editorOption: {
        placeholder: 'Hello World'
      }
    }
  },
  components: {
    quillEditor
  },
  methods: {
    onSubmit (v) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          htmlDecodeByRegExp(this.form.detail).then(
            (res) => {

            }
          ).catch(
            err => err
          )
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
    }
  }
}
</script>
