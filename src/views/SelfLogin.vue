<template>
  <div class="demo-login">
    <div style="font-weight: bold;margin-bottom: 20px"><h1>驾乘人员颅脑伤情监测平台</h1></div>
    <Login @on-submit="handleSubmit">
      <UserName name="username" />
      <Password name="password" />
      <Captcha class="demo-login-captcha" name="captcha" :count-down="0" @on-get-captcha="handleGetCaptcha">
        <template #text>
          <img :src="'https://file.iviewui.com/iview-pro/' + captcha">
        </template>
      </Captcha>
      <Submit />
    </Login>
  </div>
</template>

<script>
import { login } from '@/api/userApi'

export default {
  name: 'SelfLogin',
  data () {
    return {
      captcha: 'captcha1.png'
    }
  },
  methods: {
    handleSubmit (valid, { username, password }) {
      if (valid) {
        login(username, password).then(res => {
          if (res.code === 200) {
            sessionStorage.setItem("token", res.data)
            this.$router.replace({path: '/' })
            sessionStorage.setItem("username", username)
          }
        })
      }
    },
    handleGetCaptcha () {
      // 这里只是模拟切换图形验证码
      if (this.captcha === 'captcha1.png') {
        this.captcha = 'captcha2.png';
      } else {
        this.captcha = 'captcha1.png';
      }
    }
  }
}
</script>

<style scoped>
.demo-login{
  width: 400px !important;
  margin: 0 auto;
  margin-top: 200px;
}
.demo-login-captcha .ivu-btn{
  padding: 0;
}
.demo-login-captcha .ivu-btn img{
  height: 28px;
  position: relative;
  top: 4px;
}
</style>
