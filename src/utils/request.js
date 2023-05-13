import axios from 'axios'
import {Message} from "view-ui-plus";
import router from '../router'

const request = axios.create({
    baseURL: '/api',  // 注意！！ 这里是全局统一加上了 '/api' 前缀，也就是说所有接口都会加上'/api'前缀在，页面里面写接口的时候就不要加 '/api'了，否则会出现2个'/api'，类似 '/api/api/user'这样的报错，切记！！！
    timeout: 5000
})

// request 请求器
// 可以自请求发送前对请求做一些处理
// 比如统一加token，对请求参数统一加密
request.interceptors.request.use(config => {
    if(config && config.headers){
        config.headers['Content-Type'] = 'application/json;charset=utf-8';
    }
    config.headers['token'] = sessionStorage.getItem("token");  // 设置请求头
    return config
}, error => {
    return Promise.reject(error)
});

// response 拦截器
// 可以在接口响应后统一处理结果
request.interceptors.response.use(
    response => {
        let res = response.data;
        // 如果是返回的文件
        if (response.config.responseType === 'blob') {
            return res
        }
        // 兼容服务端返回的字符串数据
        if (typeof res === 'string') {
            res = res ? JSON.parse(res) : res
        }
        if (res.code === 403) {
            // 没有token访问其他页面跳转至登录页面
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
        }
        if (res.code === 500) {
            Message['error']({
                background: true,
                content: '后端接口异常，请稍后重试！'
            });
        }
        return res;
    },
    error => {
        Message['error']({
            background: true,
            content: '后端接口异常，请稍后重试！'
        });
        return Promise.reject(error)
    }
)


export default request
