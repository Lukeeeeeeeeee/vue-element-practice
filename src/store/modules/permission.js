import { constantRouterMap, asyncRouterMap } from '@/router';
/**
 * 通过 meta.role 判断路由是否与当前用户权限匹配
 * 
 * @param {any} roles 
 * @param {any} route 
 * @returns 
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.indexOf(role) >= 0)
    } else {
        return true
    }
}

/**
 * 递归过滤异步路由表，返回符合当前用户角色权限的路由表
 * 
 * @param {any} asyncRouterMap 
 * @param {any} roles 
 * @returns 
 */
function filterAsyncRouter(asyncRouterMap, roles) {
    const accessedRoutes = asyncRouterMap.filter(route => {
        if (hasPermission(roles, route)) {
            if (route.children && route.children.length) {
                route.children = filterAsyncRouter(route.children, roles);
            }
            return true
        }
        return false
    })
    return accessedRoutes;
}

const permission = {
    state: {
        routers: constantRouterMap,
        addRouters: []
    },
    mutations: {
        // 根据 roles (角色)获取不同的路由
        SET_ROUTERS: (state, routers) => {
            state.addRouters = routers;
            state.routers = constantRouterMap.concat(routers);
        }
    },
    actions: {
        // 根据 roles 获取路由方法
        GenerateRoutes({ commit }, data) {
            return new Promise(resolve => {
                const { roles } = data;
                let accessedRoutes;
                if (roles.indexOf('admin') >= 0) {
                    accessedRoutes = asyncRouterMap;
                } else {
                    accessedRoutes = filterAsyncRouter(asyncRouterMap, roles);
                }
                commit('SET_ROUTERS', accessedRoutes);
                resolve();
            })
        }
    }
}

export default permission
