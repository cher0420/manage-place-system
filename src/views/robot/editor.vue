<template>
  <div>
    <!--<div class="crumbs">-->
      <!--<el-breadcrumb separator="/">-->
        <!--<el-breadcrumb-item><i class="el-icon-date"></i> 表单</el-breadcrumb-item>-->
        <!--<el-breadcrumb-item>编辑器</el-breadcrumb-item>-->
      <!--</el-breadcrumb>-->
    <!--</div>-->
    <div class="container">
      <quill-editor ref="myTextEditor" v-model="content" :options="editorOption"></quill-editor>
    </div>
  </div>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import { quillEditor } from 'vue-quill-editor'
export default {
  name: 'editor',
  data: function () {
    return {
      content: '',
      editorOption: {
        placeholder: 'Hello World'
      }
    }
  },
  components: {
    quillEditor
  },
  methods: {
    submit () {
      this.$message.success('提交成功！')
    }
  }
}
</script>
