<template>
    <div class="tags-view-container">
        <scroll-pance class="tags-view-wrapper">
            <router-link 
                class="tags-view-item" 
                v-for="tag in Array.from(visitedViews)" 
                :key="tag.path"
                :to="tag.path"
                :class="isActive(tag) ? 'active' : ''">
                {{ tag.title }}
                <span class="el-icon-close"></span>
            </router-link>
        </scroll-pance>
    </div>
</template>
<script>
import ScrollPance from '@/base/ScrollPance';

export default {
    components: {
        ScrollPance
    },
    data () {
        return {
            visible: false
        }
    },
    computed: {
        visitedViews() {
            return this.$store.state.tagsView.visitedViews
        }
    },
    methods: {
        generateRoute() {
            if (this.$route.name) {
                return this.$route
            }
            return false
        },
        addViewTags() {
            const route = this.generateRoute();
            if (!route) {
                return false
            }
            this.$store.dispatch('addVisitedViews', route)
        },
        isActive(route) {
            return route.path === this.$route.path || route.name === this.$route.name
        }
    },
    mounted() {
        this.addViewTags()
    },
    watch: {
        $route() {
            this.addViewTags()
        }
    }
}
</script>

<style lang="scss" scoped>
.tags-view-container {
    .tags-view-wrapper {
        background-color: #fff;
        height: 34px;
        border-bottom: 1px solid #d8dce5;
        box-shadow: 0 1px 3px 0 rgba(0, 0, 0, .12), 0 0 3px 0 rgba(0, 0, 0, .04);
        .tags-view-item {
            display: inline-block;
            position: relative;
            height: 26px;
            line-height: 26px;
            border: 1px solid #d8dce5;
            color: #495060;
            background-color: #fff;
            padding: 0 8px;
            font-size: 12px;
            margin-left: 5px;
            margin-top: 4px;
            &:first-of-type {
                margin-left: 15px;
            }
            &.active {
                background-color: #42b983;
                color: #fff;
                border-color: #42b983;
                &::before {
                    content: '';
                    background-color: #fff;
                    display: inline-block;
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    position: relative;
                    margin-right: 2px;
                }
            }
        }
    }
}
</style>
<style lang="scss" scoped>
// reset element css of el-icon-close
.tags-view-wrapper {
    .tags-view-item {
        .el-icon-close {
            width: 16px;
            height: 16px;
            vertical-align: 2px;
            border-radius: 50px;
            text-align: center;
            transition: all .3s cubic-bezier(.645, .045, .355, 1);
            transform-origin: 100% 50%;
            &:before {
                transform: scale(.6);
                display: inline-block;
                vertical-align: -3px;
            }
            &:hover {
                background-color: #4bcccc;
                color: #fff;
            }
        }
    }
}
</style>

