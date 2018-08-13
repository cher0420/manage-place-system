<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="100px">
    <el-form-item label="机器人名称" prop="name">
      <el-col :span="16">
        <el-input v-model="form.name"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="代码模版ID" prop="id">
      <el-col :span="16">
        <el-input v-model="form.id"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="机器人类型" prop="type">
      <el-col :span="16">
        <el-select placeholder="请选择" v-model="form.type">
          <el-option label="SSOC" value="SSOC">
          </el-option>
        </el-select>
      </el-col>
    </el-form-item>
    <el-form-item label="部署模式" prop="mode">
      <el-col :span="16">
        <el-radio-group v-model="form.mode">
          <el-radio label="独立部署" value=""></el-radio>
          <el-radio label="共享部署" value="share"></el-radio>
        </el-radio-group>
      </el-col>
    </el-form-item>
    <el-form-item label="自动部署" prop="auto">
      <el-col :span="16">
        <el-switch v-model="form.auto"></el-switch>
      </el-col>
    </el-form-item>
    <el-form-item label="机器人领域" prop="field">
      <el-col :span="16">
        <el-select placeholder="请选择" v-model="form.field">
          <el-option label="企业服务" value="company">
          </el-option>
        </el-select>
      </el-col>
    </el-form-item>
    <el-form-item label="机器人图标" prop="icon">
      <el-col :span="16">
        <el-input v-model="form.icon"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="体验二维码" prop="Qrcode">
      <el-col :span="16">
        <el-input v-model="form.Qrcode">
        </el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="描述" prop="description">
      <el-col :span="16">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入内容"
          v-model="form.description">
        </el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="详情" class="container" prop="detail">
      <el-col :span="16">
        <quill-editor ref="myTextEditor" v-model="form.detail" :options="editorOption"></quill-editor>
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
        name: '',
        id: '',
        type: '',
        mode: '',
        auto: false,
        field: '',
        icon: '',
        Qrcode: '',
        description: '',
        detail: ''
      },
      rules: {
        name: [
          {required: true, message: '请输入名称！', trigger: 'blur'}
        ],
        id: [{required: false, message: '请输入代码模版ID!'}],
        type: [{required: true, message: '请选择类型！', trigger: 'blur'}],
        mode: [{required: true, message: '请选择部署模式！', trigger: 'blur'}],
        auto: [{required: true, message: '请选择是否自动部署！', trigger: 'blur'}],
        field: [{required: true, message: '请选择机领域！', trigger: 'blur'}],
        icon: [{required: true, message: '请输入图标地址！', trigger: 'blur'}],
        Qrcode: [{required: false, message: '请输入二维码地址！', trigger: 'blur'}],
        description: [{required: true, message: '请添加描述！', trigger: 'blur'}],
        detail: [{required: true, message: '请添加详情！', trigger: 'blur'}]
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
      this.$confirm('确认删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.push('/robot/index')
      }).catch(() => {
        return false
      })
    }
  }
}
</script>
<style>
</style>
