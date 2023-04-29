import axios from 'axios'
import {Message} from "view-ui-plus";
import router from '../router'
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8';
// 创建axios实例
const request = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL:   process.env.VUE_APP_API,
    // 超时
    timeout: 3000,
})

// 请求拦截器
request.interceptors.request.use(
    config => {
        // 让每个请求携带自定义token 请根据实际情况自行修改
        config.headers['token'] = sessionStorage.getItem('token')
        return config;
    },
    error => {
        console.log('err：' + error);
        return Promise.reject(error);
    }
)

// 响应拦截器
request.interceptors.response.use(
    response => {
        if (response.code === 403) {
            Message['error']({
                background: true,
                content: '登录已失效，请重新登录！'
            });
            sessionStorage.clear();
            router.replace({
                path: '/login',
                // 登录成功后跳入浏览的当前页面
                query: { redirect: router.currentRoute.value.fullPath }
            })
        } else if (response.code === 500) {
            Message['error']({
                background: true,
                content: '服务异常，请稍后重试！'
            });
            router.replace({
                path: router.currentRoute.value.fullPath
            })
        } else {
            return response.data;
        }
    },
    error => {
        console.log('err：' + error);
        let { message } = error;
        if (message == "Network Error") {
            message = "后端接口连接异常";
        }
        else if (message.includes("timeout")) {
            message = "系统接口请求超时";
        }
        else if (message.includes("Request failed with status code")) {
            message = "系统接口" + message.substr(message.length - 3) + "异常";
        }
        return Promise.reject(message);
    }
)
export default request;
