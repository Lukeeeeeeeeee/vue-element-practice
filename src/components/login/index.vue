<template>
    <div class="login-container">
        <!-- 
            Form 组件提供了表单验证的功能，只需要通过 rules 属性传入约定的验证规则，
            并 Form-Item 的 prop 属性设置为需校验的字段名即可。

            model: 表单数据对象
            rules: 表单验证规则
            prop: 校验的字段名
            label-position: 表单域标签的位置
            auto-complete: 原生属性，自动补全
         -->
        <el-form ref="loginForm" :rules="loginRules" class="login-form" autoComplete="on" :model="loginForm" label-position="left">
            <div class="title-container">
                <h3 class="title">系统登录</h3>
            </div>
            <!-- 帐户名 -->
            <el-form-item prop="username">
                <span class="svg-container svg-container_login">
                    <svg-icon icon-class="user" />
                </span>
                <el-input name="username" v-model="loginForm.username" type="text" autoComplete="no" placeholder="用户名称" />
            </el-form-item>
            <!-- 密码 -->
            <el-form-item prop="password">
                <span class="svg-container">
                    <svg-icon icon-class="password" />
                </span>
                <el-input name="password" v-model="loginForm.password" :type="passwordType" @keyup.enter.native="handleLogin" autoComplete="on" placeholder="用户密码" />
                <span class="show-pwd" @click="showPwd">
                    <svg-icon :icon-class="iconClass" />
                </span>
            </el-form-item>

            <!-- 按钮 -->
            <el-button @click.native.prevent="handleLogin" :loading="loading" type="primary" style="width: 100%; margin-bottom: 30px" >登录</el-button>
        </el-form>
    </div>
</template>

<script>
import { isvalidUsername } from '@/utils/validate';
export default {
    data () {
        // 验证用户名是否正确填写
        const validateUsername = (rule, value, callback) => {
            if (!isvalidUsername(value)) {
                callback(new Error('请输入正确的用户名'));
            } else {
                callback()
            }
        }
        const validatePassword = (rule, value, callback) => {
            if (value.length < 6) {
                callback(new Error('密码不能小于6位数'));
            } else {
                callback()
            }
        }
        return {
            loginForm: {
                username: 'admin',
                password: '111111'
            },
            loginRules: {
                username: [{ required: true, trigger: 'blur', validator: validateUsername }],
                password: [{ required: true, trigger: 'blur', validator: validatePassword }],                
            },
            passwordType: 'password',
            iconClass: 'eye-off',
            loading: false
        }
    },
    methods: {
        // 展示密码
        showPwd() {
            if (this.passwordType === 'password') {
                this.passwordType = '';
                this.iconClass = 'eyes';
            } else {
                this.passwordType = 'password';
                this.iconClass = 'eye-off';
            }
        },
        // 校验密码
        handleLogin() {
            this.$refs.loginForm.validate(valid => {
                if (valid) {
                    this.loading = true;
                    this.$store.dispatch('LoginByUsername', this.loginForm).then(() => {
                        this.loading = false;
                        this.$router.push({ path: '/'})
                    }).catch(() => {
                        this.loading = false;
                    })
                } else {
                    console.log('error submit!!!');
                    return false;
                }
            })
        }
    }
}
</script>

<style lang="scss">
$bg: #2d3a4b;
$light_gray: #eee;

/* reset element-ui css */
.login-container {
    .el-input {
        display: inline-block;
        height: 47px;
        width: 85%;
        input {
            background-color: transparent;
            border: 0;
            -webkit-appearance: none; // 去除系统默认 appearance 的样式,常用于 IOS 下移除原生样式
            border-radius: 0;
            padding: 12px 5px 12px 15px;
            color: $light_gray;
            height: 47px;
            &:-webkit-autofill { // 改变谷歌浏览器 input 屎黄色填充
                -webkit-box-shadow: 0 0 0 1000px $bg inset !important;
                -webkit-text-fill-color: #fff !important;
            }
        }
    }
    .el-form-item {
        border: 1px solid rgba(255, 255, 255, 0.1);
        background-color: rgba(0, 0, 0, 0.1);
        border-radius: 5px;
        color: #454545;
    }
}
</style>


<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
    position: fixed;
    height: 100%;
    width: 100%;
    background-color: $bg;
    .login-form {
        position: absolute;
        left: 0;
        right: 0;
        width: 520px;
        padding: 35px 35px 15px;
        margin: 120px auto;
    }
    .svg-container {
        padding: 6px 5px 6px 15px;
        color: $dark_gray;
        vertical-align: middle;
        width: 30px;
        display: inline-block;
        &_login {
            font-size: 20px;
        }
    }
    .title-container {
        position: relative;
        .title {
            font-size: 26px;
            font-weight: 400;
            color: $light_gray;
            margin: 0 auto 40px;
            text-align: center;
            font-weight: bold;
        }
    }
    .show-pwd {
        position: absolute;
        right: 10px;
        top: 7px;
        font-size: 16px;
        color: $dark_gray;
        cursor: pointer;
        user-select: none; // none: 文本不能被选择
    }
}
</style>

