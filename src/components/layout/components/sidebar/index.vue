<template>
    <!-- 
        mode: horizontal / vertical 默认: vertical
        default-active: 当前激活菜单的 index
        collapse: 是否水平折叠收起菜单（仅在 mode 为 vertical 时可用）
        background-color: 菜单的背景色
        text-color: 菜单的文字颜色
        active-text-color: 当前激活菜单的文字颜色
     -->
     <scroll-bar>
        <el-menu mode="vertical" :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#bfcbd9" active-text-color="#409eff">
            <sidebar-item :routes="permission_routers"></sidebar-item>
        </el-menu>
    </scroll-bar>
</template>

<script>
import SidebarItem from './sidebarItem';
import ScrollBar from '@/base/ScrollBar';
import { mapGetters } from 'vuex';

export default {
    components: {
        ScrollBar,
        SidebarItem
    },
    computed: {
        ...mapGetters([
            'permission_routers'
        ]),
        isCollapse() {

        }
    }
}
</script>


