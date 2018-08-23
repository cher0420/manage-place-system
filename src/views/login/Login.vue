<template>
  <div class="login-container p-relative">
    <div class="yoy-login-bg p-absolute"></div>
    <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <h3 class="title">Market 内容管理</h3>
      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <i class="iconfont icon-xingmingyonghumingnicheng f-size-20"></i>
        </span>
        <el-input name="username" type="text" v-model="loginForm.UserName" autoComplete="on" placeholder="用户名" />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <i class="iconfont icon-mima1 f-size-20"></i>
        </span>
        <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.Password" autoComplete="on"
                  placeholder="密码"></el-input>
      </el-form-item>
        <el-checkbox v-model="checked" @change ='change' class="m-bottom-20 yoy-checked">记住密码</el-checkbox>
      <el-form-item>
        <el-button class='f-size-16' type="primary" style="width:100%;" :loading="buttonLoading" @click.native.prevent="handleLogin">
          {{buttonLoading?'登 录 中':'立 即 登 录'}}
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { isvalidUsername } from '../../utils/validate'
// import {login} from '../../utils/server'

import store from '../../store'
import {REPLACE} from '../../store/mutation-types'
import URL from '../../constants/baseUrl'
import {setCookies, getCookies, removeCookies} from '../../utils/utils'
import {LOGINAPI} from '../../constants/api'

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
      checked: false,
      loginForm: {
        UserName: '',
        Password: ''
      },
      loginRules: {
        UserName: [{ required: true, trigger: 'blur', validator: validateUsername }],
        Password: [{ required: true, trigger: 'blur', validator: validatePass }]
      },
      buttonLoading: false,
      pwdType: 'password'
    }
  },
  created: function () {
    const UserName = getCookies('UserName')
    const Password = getCookies('Password')
    if (UserName && Password) {
      const form = {
        UserName,
        Password
      }
      this.checked = true
      this.loginForm = form
    }
  },
  methods: {
    change (v) {
      if (v) {
        setCookies('UserName', this.loginForm.UserName, { expires: 365 })
        setCookies('Password', this.loginForm.Password, { expires: 365 })
      } else {
        removeCookies('UserName')
        removeCookies('Password')
      }
    },
    showPwd () {
      if (this.pwdType === 'password') {
        this.pwdType = ''
      } else {
        this.pwdType = 'password'
      }
    },
    handleLogin () {
      const form = this.loginForm
      const that = this
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.buttonLoading = true
          const params = {
            UserName: form.UserName,
            Password: form.Password
          }
          if (that.checked) {
            setCookies('UserName', form.UserName, { expires: 365 })
            setCookies('Password', form.Password, { expires: 365 })
          }
          that.login(params)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    login (parms) {
      const that = this
      const baseData = JSON.stringify(parms)
      fetch(URL.baseUrl + LOGINAPI, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: baseData
      }).then(response => response.json()).then((res) => {
        if (res.Status) {
          setCookies('Access-Token', res.Token)
          this.buttonLoading = false
          store.dispatch(REPLACE, {login: true}).then(() => {
            that.$router.push({ path: '/field/index' })
            return true
          }).catch(err => err)
        } else {
          that.buttonLoading = false
          that.$message({
            type: 'error',
            message: '用户名或密码错误！'
          })
          return false
        }
      }).catch(err => err)
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
<style rel="stylesheet/scss" lang="scss">
  .yoy-checked{
    color:#ccc;
    .el-checkbox__input.is-checked + .el-checkbox__label{
      color:#ccc !important;
    }
  }
</style>
<style rel="stylesheet/scss" lang="scss" scoped>
  @import '../../style/index';
  $bg:#2d3a4b;
  $dark_gray:#889aa4;
  $light_gray:#eee;
  .m-bottom-20{
    margin-bottom:20px;
  }
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
