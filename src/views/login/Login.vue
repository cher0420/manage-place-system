<template>
  <div class="login-container p-relative">
    <div class="yoy-login-bg p-absolute"></div>
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <h3 class="title">Hightalk - 后台管理</h3>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <i class="iconfont icon-xingmingyonghumingnicheng f-size-20"></i>
        </span>
        <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="用户名" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <i class="iconfont icon-mima1 f-size-20"></i>
        </span>
        <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
                  placeholder="密码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class='f-size-16' type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">
          {{loading?'登 录 中':'立 即 登 录'}}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { isvalidUsername } from '../../utils/validate'
import {setCookies} from '../../utils/utils'

export default {
  name: 'login',
  data () {
    const validateUsername = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error('请输入正确的用户名'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error('密码不能小于5位'))
      } else {
        callback()
      }
    }
    return {
      loginForm: {
        username: 'admin',
        password: 'admin'
      },
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      loading: false,
      pwdType: 'password'
    }
  },
  methods: {
    showPwd () {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin () {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          setCookies('username', this.loginForm.username, {expires: 1 / 12})
          setCookies('password', this.loginForm.password, {expires: 1 / 12})
          this.$router.push({ path: '/' })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
  $bg:#2d3a4b;
  $light_gray:#eee;

  /* reset element-ui css */
  .login-container {
    width: 100vw;
    height: 100vh;
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;
      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        color: $light_gray;
        height: 47px;
        &:-webkit-autofill {
          -webkit-box-shadow: 0 0 0px 1000px $bg inset !important;
          -webkit-text-fill-color: #fff !important;
        }
      }
    }
    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
      color: #454545;
    }
  }

</style>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../../style/index';
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;
  .login-container {
    background: url("../../assets/bg.jpg") center no-repeat;
    background-size: cover;
    .login-form {
      position: absolute;
      left: 0;
      right: 0;
      top: 50%;
      width: 520px;
      padding: 35px 35px 15px 35px;
      margin: -175px auto;
      border-radius: 6px;
      -moz-box-shadow:0 0 20px #D4D7E1;
      -webkit-box-shadow:0 0 20px #D4D7E1;
      box-shadow:0 0 20px #D4D7E1;
      background: #021231;
    }
    .yoy-login-bg{
      width: 100%;
      height:100%;
      background: url("../../assets/bg.jpg") center no-repeat;
      background-size: cover;
      -webkit-filter: blur(20px);
      -moz-filter: blur(20px);
      -ms-filter: blur(20px);
      filter: blur(20px);
    }
    .tips {
      font-size: 14px;
      color: #fff;
      margin-bottom: 10px;
      span {
        &:first-of-type {
          margin-right: 16px;
        }
      }
    }
    .svg-container {
      padding: 6px 5px 6px 15px;
      color: $dark_gray;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
      &_login {
        font-size: 20px;
      }
    }
    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0 auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      color: $dark_gray;
      cursor: pointer;
      user-select: none;
    }
  }
</style>
