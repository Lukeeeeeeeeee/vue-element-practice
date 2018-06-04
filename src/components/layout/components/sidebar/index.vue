<template>
    <!-- 
        mode: horizontal / vertical 默认: vertical
        default-active: 当前激活菜单的 index
        collapse: 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）
        background-color: 菜单的背景色
        text-color: 菜单的文字颜色
        active-text-color: 当前激活菜单的文字颜色
     -->
     <el-scrollbar wrapClass="scrollbar-wrapper">
        <el-menu 
            mode="vertical" 
            :show-timeout="200" 
            :default-active="$route.path" 
            :collapse="isCollapse" 
            background-color="#304156" 
            text-color="#bfcbd9" 
            active-text-color="#409eff">
            
            <sidebar-item :routes="permission_routers"></sidebar-item>
        </el-menu>
    </el-scrollbar>
</template>

<script>
import SidebarItem from './sidebarItem';
import { mapGetters } from 'vuex';

export default {
    components: {
        SidebarItem
    },
    computed: {
        ...mapGetters([
            'permission_routers',
            'sidebar'
        ]),
        isCollapse() {
            return !this.sidebar.opened
        }
    }
}
</script>


