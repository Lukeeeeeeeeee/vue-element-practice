const getters = {
    permission_routers: state => state.permission.routers,
    addRouters: state => state.permission.addRouters,
    roles: state => state.user.roles,
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    introduction: state => state.user.introduction,
    sidebar: state => state.app.sidebar
}

export default getters