import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import {Message} from "view-ui-plus";

const routes = [
  {
    path: '/',
    name: 'home',
    meta: {
      roles: ['admin', 'user']
    },
    component: HomeView
  },
  {
    path: '/accident_warning',
    name: 'AccidentWarning',
    meta: {
      roles: ['admin']
    },
    component: () => import('../views/AccidentInfoList.vue')
  },
  {
    path: '/accident_vehicle',
    name: 'AccidentVehicle',
    meta: {
      roles: ['admin']
    },
    component: () => import('../views/VehicleList.vue')
  },
  {
    path: '/accident_details',
    name: 'AccidentDetails',
    meta: {
      roles: ['admin']
    },
    component: () => import('../views/AccidentDetails.vue')
  }
  ,
  {
    path: '/login',
    name: 'Login',
    meta: {
      roles: ['admin', 'user']
    },
    component: () => import('../views/SelfLogin.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const role = 'admin'

router.beforeEach((to, from, next)=>{
  if(to.meta.roles.includes(role)) {
    next()
  } else {
    Message['error']({
      background: true,
      content: '您还没有权限哦，请联系管理员！'
    });
  }
})

export default router
