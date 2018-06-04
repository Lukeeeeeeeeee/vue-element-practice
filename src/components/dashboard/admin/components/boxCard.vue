<template>
    <el-card class="box-card-component" style="margin-left: 8px;">
        <div slot="header" class="box-card-header">
            <img src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png">
        </div>
        <div style="position: relative">
            <pan-thumb class="panThumb" :image="avatar"></pan-thumb>
            <mallki className="mallki-text" text="vue-element-admin"></mallki>
            <div style="padding-top: 35px;" class="progress-item">
                <span>Vue</span>
                <el-progress :percentage="70"></el-progress>
            </div>
            <div class="progress-item">
                <span>JavaScript</span>
                <el-progress :percentage="18"></el-progress>
            </div>
            <div class="progress-item">
                <span>Css</span>
                <el-progress :percentage="12"></el-progress>
            </div>
            <div class="progress-item">
                <span>ESLint</span>
                <el-progress :percentage="100" status="success"></el-progress>
            </div>
        </div>
    </el-card>
</template>

<script>
import PanThumb from '@/base/PanThumb';
import Mallki from '@/base/TextHoverEffect/mallki';
import { mapGetters } from 'vuex';

export default {
    components: {
        PanThumb,
        Mallki
    },
    computed: {
        ...mapGetters([
            'avatar'
        ])
    }
}
</script>

<style lang="scss">
.box-card-component {
    .el-card__header {
        padding: 0px!important;
    }
}
</style>
<style lang="scss" scoped>
.box-card-component {
    .box-card-header {
        position: relative;
        height: 220px;
        img {
            width: 100%;
            height: 100%;
            transition: all .2s linear;
            &:hover {
                transform: scale(1.1, 1.1);
                filter: contrast(130%);
            }
        }
    }
    .panThumb {
        z-index: 100;
        height: 70px!important;
        width: 70px!important;
        position: absolute!important;
        top: -45px;
        left: 0;
        border: 5px solid #fff;
        background-color: #fff;
        margin: auto;
        box-shadow: none!important;
        /deep/ .pan-info {
            box-shadow: none!important;
        }
    }
    .mallki-text {
        position: absolute;
        top: 0;
        right: -15px;
        font-size: 20px;
        font-weight: bold;
    }
    .progress-item {
        margin-bottom: 10px;
        font-size: 14px;
    }
    @media screen and (max-width: 1510px) {
        .mallki-text {
            display: none;
        }
    }
}
</style>



