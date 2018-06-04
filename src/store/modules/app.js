import Cookies from 'js-cookie'

const app = {
    state: {
        sidebar: {
            opened: !+Cookies.get('sidebarStatus') // 初始cookie.siderbarStatus为空
        }
    },
    mutations: {
        TOGGLE_SIDERBAR: state => {
            if (state.sidebar.opened) {
                Cookies.set('sidebarStatus', 1)
            } else {
                Cookies.set('sidebarStatus', 0)
            }
            state.sidebar.opened = !state.sidebar.opened
        }
    },
    actions: {
        toggleSideBar({ commit }) {
            commit('TOGGLE_SIDERBAR')
        }
    }
}

export default app