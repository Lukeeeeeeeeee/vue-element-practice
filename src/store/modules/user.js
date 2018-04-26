import { AloginByUsername, AgetUserInfo, Alogout } from '@/api/login';
import { getToken, setToken, removeToken } from '@/utils/token';

const user = {
    state: {
        token: getToken(),
        roles: [],
        name: '',
        avatar: '',
        introduction: ''
    },
    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (state, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_INTRODUCTION: (state, introduction) => {
            state.introduction = introduction
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        }
    },
    actions: {
        // 用户名登录
        LoginByUsername({ commit }, userInfo) {
            const username = userInfo.username.trim();
            return new Promise((resolve, reject) => {
                AloginByUsername(username, userInfo.password).then(response => {
                    // 获取用户信息
                    const data = response.data;
                    // 设置token
                    commit('SET_TOKEN', data.token);
                    // 获取token
                    setToken(response.data.token);
                    resolve();
                }).catch(error => {
                    reject(error);
                })
            })
        },
        // 获取用户权限信息
        GetUserInfo({ commit, state }) {
            return new Promise((resolve, reject) => {
                AgetUserInfo(state.token).then(response => {
                    if (!response.data) {
                        reject('error')
                    }
                    const data = response.data;
                    commit('SET_ROLES', data.roles);
                    commit('SET_NAME', data.name);
                    commit('SET_AVATAR', data.avatar);
                    commit('SET_INTRODUCTION', data.introduction);
                    resolve(response);
                }).catch(error => {
                    reject(error);
                })
            })
        },
        // 登出
        LogOut({ commit, state }) {
            return new Promise((resolve, reject) => {
                Alogout(state.token).then(() => {
                    commit('SET_TOKEN', '');
                    commit('SET_ROLES', []);
                    removeToken();
                    resolve()
                }).catch(error => {
                    reject(error);
                })
            })
        },
        // 前端 登出
        FedLogOut({ commit }) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '');
                removeToken();
                resolve()
            })
        }
    }
}

export default user


