import axios from 'axios';
import store from '@/store';
import { Message } from 'element-ui'
import { getToken } from '@/utils/token';

const service = axios.create({
    baseURL: process.env.BASE_API,
    timeout: 5000
})

// 请求拦截
service.interceptors.request.use(config => {
    // 如果有token，则在发送请求之前携带一些信息
    if (store.getters.token) {
        config.headers['X-Token'] = getToken()
    }
    return config
}, error => {
    console.log(error);
    Promise.reject(error);
})

// 响应拦截
service.interceptors.response.use(
    response => response,
    error => {
        console.log('err' + error);
        Message({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)

export default service