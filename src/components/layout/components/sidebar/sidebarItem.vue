<template>
    <div class="menu-wrapper">
        <template v-for="item in routes" v-if="!item.hidden && item.children">
            <!-- 
                判断：如果item的子路由为1，则显示下面的 ↓↓↓↓↓↓↓↓↓
             -->
            <router-link 
                v-if="hasOneShowingChildren(item.children) 
                    && !item.children[0].children 
                    && !item.alwaysShow" 
                    :to="item.path + '/' + item.children[0].path" 
                    :key="item.children[0].name">
                <!-- 
                    index: 唯一标志
                 -->
                <el-menu-item :index="item.path + '/' + item.children[0].path" :class="{'submenu-title-noDropdown': !isNest}">
                    <svg-icon v-if="item.children[0].meta && item.children[0].meta.icon" :icon-class="item.children[0].meta.icon" />
                    <span v-if="item.children[0].meta && item.children[0].meta.title" slot="title">
                        {{ item.children[0].meta.title }}
                    </span>
                </el-menu-item>
            </router-link>

            <!-- 
                否则显示下面的 ↓↓↓↓↓↓↓↓↓ (v-else)
            -->
            <el-submenu v-else :index="item.name || item.path" :key="item.name">
                <!-- 
                    slot: 具名插槽
                 -->
                 <template slot="title">
                     <svg-icon v-if="item.meta && item.meta.icon" :icon-class="item.meta.icon" />
                     <span v-if="item.meta && item.meta.title" slot="title">
                         {{ item.meta.title }}
                     </span>
                 </template>

                 <!-- 
                     下面显示的是子路由
                  -->
                  <template v-for="child in item.children" v-if="!child.hidden">

                      <!-- 
                          判断：子路由下是否还有子路由(多级路由嵌套)
                       -->
                       <sidebar-item
                            :is-nest="true"
                            class="nest-menu"
                            v-if="child.children && child.children.length > 0" 
                            :routes="[child]"
                            :key="child.path"></sidebar-item>
                        
                        <!-- 
                            否则显示下面的
                         -->
                         <router-link v-else :to="item.path + '/' + child.path" :key="child.name">
                            <el-menu-item :index="item.path + '/' + child.path">
                                <svg-icon v-if="child.meta && child.meta.icon" :icon-class="child.meta.icon" />
                                <span v-if="child.meta && child.meta.title" slot="title">
                                    {{ child.meta.title }}
                                </span>
                            </el-menu-item>
                         </router-link>
                  </template>
            </el-submenu>
        </template>
    </div>
</template>

<script>
export default {
    name: 'sidebarItem',
    props: {
        routes: {
            type: Array
        },
        isNest: {
            type: Boolean,
            default: false
        }
    },
    methods: {
        hasOneShowingChildren(children) {
            const showingChildren = children.filter(item => {
                return !item.hidden
            })
            if (showingChildren.length === 1) {
                return true
            }
            return false
        }
    }
}
</script>

