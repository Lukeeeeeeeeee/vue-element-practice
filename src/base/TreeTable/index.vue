<template>
    <!-- v-bind https://juejin.im/post/596c7af1f265da6c251906c0#heading-1 -->
    <el-table :data="formatData" :row-style="showRow" v-bind="$attrs">
        <el-table-column label="ID" v-if="columns.length === 0" width="150">
            <template slot-scope="scope">
                <span v-for="space in scope.row._level" :key="space" class="ms-tree-space"></span>
                <span class="tree-ctrl" v-if="iconShow(0, scope.row)" @click="toggleExpanded(scope.$index)">
                    <i class="el-icon-plus" v-if="!scope.row._expanded"></i>
                    <i class="el-icon-minus" v-else></i>
                </span>
                {{scope.$index}}
            </template>
        </el-table-column>

        <el-table-column 
            v-else
            v-for="(column, index) in columns" 
            :key="column.value"
            :label="column.text"
            :width="column.width">
            <template slot-scope="scope">
                <span v-if="index === 0" v-for="space in scope.row._level" :key="space" class="ms-tree-space"></span>
                <span class="tree-ctrl" v-if="iconShow(index, scope.row)" @click="toggleExpanded(scope.$index)">
                    <i class="el-icon-plus" v-if="!scope.row._expanded"></i>
                    <i class="el-icon-minus" v-else></i>
                </span>
                {{scope.row[column.value]}}
            </template>
        </el-table-column>

        <slot></slot>

    </el-table>
</template>

<script>
import treeToArray from './eval'

export default {
    name: 'treeTable',
    props: {
        data: {
            type: [Array, Object],
            required: true
        },
        columns: {
            type: Array,
            default: () => []
        },
        evalFunc: Function,
        evalArgs: Array,
        expandAll: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        // 格式化数据源
        formatData: function() {
            let tmp;
            if (!Array.isArray(this.data)) {
                tmp = [this.data]
            } else {
                tmp = this.data
            }
            const func = this.evalFunc || treeToArray
            const args = this.evalArgs ? Array.concat([tmp, this.expandAll], this.evalArgs) : [tmp, this.expandAll]
            return func.apply(null, args)
        }
    },
    methods: {
        showRow: function(row) {
            // console.log(row) // 每行
            const show = (row.row.parent ? (row.row.parent._expanded && row.row.parent._show) : true)
            row.row._show = show
            return show ? 'animation: treeTableShow 1s; -webkit-animation:treeTableShow 1s;' : 'display: none'
        },
        // 图标显示
        iconShow(index, record) {
            // console.log(index)
            // console.log(record)
            return (index === 0 && record.children && record.children.length > 0)
        },
        // 切换下级是否展开
        toggleExpanded: function(trIndex) {
            // console.log(index)
            const record = this.formatData[trIndex]
            // console.log(record)
            record._expanded = !record._expanded
        }
    }
}
</script>

<style>
@keyframes treeTableShow {
    from {opacity: 0;}
    to {opacity: 1;}
}
@-webkit-keyframes treeTableShow {
    from {opacity: 0;}
    to {opacity: 1;}
}
</style>

<style lang="scss" scoped>
$color-blue: #2196f3;
$space-width: 18px;
.ms-tree-space {
    position: relative;
    top: 1px;
    display: inline-block;
    font-style: normal;
    font-weight: 400;
    line-height: 1;
    width: $space-width;
    height: 14px;
    &::before {
        content: ''
    }
}

// 没看到效果
.processContainer {
    width: 100%;
    height: 100%;
}

// 没看到有啥用
table td {
    line-height: 26px;
}

.tree-ctrl {
    position: relative;
    cursor: pointer;
    color: $color-blue;
    margin-left: -$space-width;
}
</style>

