<template>
    <div class="app-wrapper">
        <!-- 左侧菜单 -->
        <sidebar class="sidebar-container"></sidebar>
        <!-- 主体内容 -->
        <div class="main-container">
            <nav-bar></nav-bar>
            <tags-view></tags-view>
            <app-main></app-main>
        </div>
    </div>
</template>

<script>
import { Sidebar, NavBar, TagsView, AppMain } from './components'
export default {
    name: 'layout',
    components: {
        Sidebar,
        NavBar,
        TagsView,
        AppMain
    }
}
</script>

<style lang="scss" scoped>
.app-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
}
</style>


