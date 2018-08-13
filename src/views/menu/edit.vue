<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="100px">
    <el-form-item label="菜单名" prop="name">
      <el-col :span="16">
        <el-input v-model="form.name"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="英文名" prop="EName">
      <el-col :span="16">
        <el-input v-model="form.type"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="父菜单">
      <el-col :span="16">
        <el-select v-model="form.father" placeholder="请选择">
          <el-option
            v-for="item in form.options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-col :span="16">
        <el-checkbox v-model="form.link">外链</el-checkbox>
      </el-col>
    </el-form-item>
    <el-form-item label="链接">
      <el-col :span="16">
        <el-input v-model="form.link"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="图标">
      <el-col :span="16">
        <el-input v-model="form.icon"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="排序码">
      <el-col>
        <el-input-number v-model="form.code" @change="handleChange" :min="0" :max="10"></el-input-number>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-col>
        <el-checkbox v-model="form.abled">是否可用</el-checkbox>
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
        options: [{label: '一级菜单', value: '1'}],
        father: '',
        code:1,
        link:true,
        abled: true
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
