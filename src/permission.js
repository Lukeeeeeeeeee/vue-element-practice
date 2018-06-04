import router from './router';
import store from './store';
import NProgress from 'nprogress'; // 进度条
import 'nprogress/nprogress.css'; // 进度条样式
import { getToken } from '@/utils/token';
import { Message } from 'element-ui';

NProgress.configure({ showSpinner: false });

function hasPermission(roles, permissionRoles) {
    if (roles.indexOf('admin') >= 0) {
        return true // admin permission passed directly
    }
    if (!permissionRoles) {
        return true
    }
    return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

const whiteList = ['/login'];

router.beforeEach((to, from, next) => {
    NProgress.start();
    // 在登录后获取路由前通过登录信息判断是否有 token
    if (getToken()) {
        // 判断是否从 /login 页面进入
        if (to.path === '/login') {
            next({ path: '/' });
            NProgress.done()
        } else {
            // 判断当前用户是否已拉取完user_info信息
            if (store.getters.roles.length === 0) {
                // 拉取user_info
                store.dispatch('GetUserInfo').then(res => {
                    const roles = res.data.roles; // note: roles must be a Array!
                    // 根据 roles 权限生成可访问的路由表
                    store.dispatch('GenerateRoutes', { roles }).then(() => {
                        // 动态添加可访问的路由表
                        router.addRoutes(store.getters.addRouters)
                        // hack方法，确保addRoutes已完成
                        // replace: true 以便导航不会留下历史记录
                        next({ ...to, replace: true });
                    })
                }).catch((err) => {
                    store.dispatch('FedLogOut').then(() => {
                        Message.error(err || '验证失败, 请重新登录')
                        next({ path: '/login' })
                    })
                })
            } else {
                if (hasPermission(store.getters.roles, to.meta.roles)) {
                  next()
                } else {
                  next({ path: '/401', replace: true, query: { noGoBack: true }})
                }
            }
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            // 否则全部重定向到登录页面
            next('/login')
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    NProgress.done()
})
