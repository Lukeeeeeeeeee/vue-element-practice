import request from '@/utils/request';

// 获取用户信息
export function AloginByUsername(username, password) {
    const data = {
        username,
        password
    };
    return request({
        url: '/login/login',
        method: 'post',
        data
    });
}

// 获取用户权限信息
export function AgetUserInfo(token) {
    return request({
        url: '/user/info',
        method: 'get',
        params: { token }
    })
}

// 登出
export function Alogout() {
    return request({
        url: '/login/logout',
        method: 'post'
    })
}




