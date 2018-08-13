<template>
  <el-form ref="form" :model="form" :rules="rules" label-width="100px">
    <el-form-item label="领域名称" prop="name">
      <el-col :span="16">
        <el-input v-model="form.name"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="领域图标" prop="icon">
      <el-col :span="16">
        <el-input v-model="form.icon"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="展示图" prop="src">
      <el-col :span="16">
        <el-input v-model="form.src"></el-input>
      </el-col>
    </el-form-item>
    <el-form-item label="领域描述" prop="description">
      <el-col :span="16">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="请输入内容"
          v-model="form.description">
        </el-input>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-col :span="16">
        <el-checkbox v-model="field">常用领域</el-checkbox>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-col :span="16">
        <el-checkbox v-model="status">是否可用</el-checkbox>
      </el-col>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button @click="cancle">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
export default {
  data () {
    return {
      form: {
        name: '',
        src: '',
        description: '',
        icon: '',
        field: true,
        status: true
      },
      rules: {
        name: [
          {required: true, message: '请输入名称！', trigger: 'blur'}
        ],
        src: [{required: true, message: '请选择类型！', trigger: 'blur'}],
        icon: [{required: true, message: '请输入图标地址！', trigger: 'blur'}],
        description: [{required: true, message: '请添加描述！', trigger: 'blur'}],
        field: [{required: true, message: '请添加详情！', trigger: 'blur'}],
        status: [{required: true, message: '请添加详情！', trigger: 'blur'}]
      },
      editorOption: {
        placeholder: 'Hello World'
      }
    }
  },
  methods: {
    onSubmit (v) {
      this.$refs.form.validate((valid) => {
        if (valid) {

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
