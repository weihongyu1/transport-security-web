<template>
  <Header>
    <Menu mode="horizontal" theme="dark" active-name="1">
      <div class="layout-logo" @click="goHome">
        <span>驾乘人员颅脑伤情监测平台</span>
      </div>
      <div class="layout-nav">
        <MenuItem name="accident" @click="goAccidentWarning">
          <Icon type="ios-keypad"></Icon>
          车辆事故信息管理
        </MenuItem>
        <MenuItem name="vehicle" @click="goVehicle">
          <Icon type="ios-analytics"></Icon>
          车辆信息管理
        </MenuItem>
        <MenuItem name="personal" v-if="name !== ''">
          <Icon type="ios-contact-outline" />
          {{ name }}
        </MenuItem>
        <MenuItem name="login" v-if="name === ''">
          <Icon type="ios-paper"></Icon>
          登录
        </MenuItem>
        <MenuItem name="register" v-if="name === ''">
          <Icon type="ios-paper"></Icon>
          注册
        </MenuItem>
      </div>
    </Menu>
  </Header>
</template>

<script>
export default {
  name: "SelfHeader",
  data() {
    return {
      login: true,
      name: sessionStorage.getItem("username")
    }
  },
  methods: {
    goHome() {
      this.$router.push({
        path:'/'
      })
    },
    goAccidentWarning() {
      this.$router.push({
        path:'/accident_warning'
      })
    },
    goVehicle() {
      this.$router.push({
        path:'/accident_vehicle'
      })
    }
  }
}
</script>

<style scoped>
.layout-logo {
  width: 20%;
  height: 30px;
  float: left;
  position: relative;
  top: 0.2rem;
  left: 20px;
  color: #d7dde4;
  cursor: pointer;
}

.layout-nav {
  width: 35%;
  margin: 0 auto;
  margin-right: 20px;
}
</style>
