<template>
    <el-menu class="navbar" mode="horizontal">
        <!-- 收缩按钮 -->
        <hamburger class="hamburger-container" :toggleClick="toggleClick"></hamburger>
        <!-- 面包屑 -->
        <breadcrumb class="breadcrumb-container"></breadcrumb>
        <!-- 
            用户
            tigger: 触发下拉行为
        -->
        <div class="right-menu">
            <el-dropdown class="avatar-container right-menu-item" trigger="click">
                <div class="avatar-wrapper">
                    <img :src="avatar + '?imageView2/1/w/80/h/80'" class="user-avatar">
                    <i class="el-icon-caret-bottom"></i>
                </div>
                <el-dropdown-menu slot="dropdown">
                    <!-- 
                        divided: 显示分割线
                    -->
                    <el-dropdown-item>
                        <span @click="logout" style="display: block;">Log Out</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </el-menu>
</template>

<script>
import Hamburger from '@/base/Hamburger';
import Breadcrumb from '@/base/Breadcrumb';
import { mapGetters } from 'vuex';

export default {
    components: {
        Hamburger,
        Breadcrumb
    },
    computed: {
        ...mapGetters([
            'avatar'
        ])
    },
    methods: {
        toggleClick() {

        },
        logout() {
            this.$store.dispatch('LogOut').then(() => {
                // 为了重新实例化vue-router对象以避免错误(没太懂)
                location.reload();
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.navbar {
    height: 50px;
    line-height: 50px;
    border-radius: 0px !important;
    .hamburger-container {
        line-height: 58px;
        height: 50px;
        float: left;
        padding: 0 10px;
    }
    .breadcrumb-container {
        float: left;
    }
    .right-menu {
        float: right;
        height: 100%;
        &:focus {
            outline: none;
        }
        .right-menu-item {
            display: inline-block;
            margin: 0 8px;
        }
        .avatar-container {
            height: 50px;
            margin-right: 30px;
            .avatar-wrapper {
                cursor: pointer;
                margin-top: 5px;
                position: relative;
                .user-avatar {
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                }
                .el-icon-caret-bottom {
                    position: absolute;
                    right: -20px;
                    top: 25px;
                    font-size: 12px;
                }
            }
        }
    }
}
</style>


