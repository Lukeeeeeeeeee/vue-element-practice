<template>
    <div class="app-container calendar-list-container">
        <!-- row-key 获取正确的行顺序 -->
        <el-table :data="list" row-key="id" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%;">

            <el-table-column align="center" label="ID" width="65">
                <template slot-scope="scope">
                    <span>{{scope.row.id}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="Date" width="180">
                <template slot-scope="scope">
                    <span>{{scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                </template>
            </el-table-column>

            <el-table-column label="Title" min-width="300">
                <template slot-scope="scope">
                    <span>{{scope.row.title}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="Author" width="110">
                <template slot-scope="scope">
                    <span>{{scope.row.author}}</span>
                </template>
            </el-table-column>

            <el-table-column label="Importance" width="100">
                <template slot-scope="scope">
                    <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star" class="icon-star" />
                </template>
            </el-table-column>

            <el-table-column align="center" label="Readings" width="95">
                <template slot-scope="scope">
                    <span>{{scope.row.pageviews}}</span>
                </template>
            </el-table-column>

            <el-table-column class-name="status-col" label="Status" width="110">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
                </template>
            </el-table-column>

            <el-table-column align="center" label="Drag" width="80">
                <template slot-scope="scope">
                    <svg-icon class="drag-handler" icon-class="drag" />
                </template>
            </el-table-column>

        </el-table>

        <div class="show-d">默认顺序 : {{oldList}}</div>
        <div class="show-d">拖拽后顺序 : {{newList}}</div>
        
    </div>
</template>

<script>
import { fetchList } from '@/api/article'
import Sortable from 'sortablejs'

export default {
    name: 'dragTable',
    data() {
        return {
            list: null,
            listQuery: {
                page: 1,
                limit: 10
            },
            listLoading: true,
            oldList: [],
            newList: [],
            sortable: null
        }
    },
    created() {
        this.getList()
    },
    methods: {
        getList() {
            fetchList(this.listQuery).then(response => {
                this.list = response.data.items;
                this.listLoading = false;
                this.oldList = this.list.map(v => v.id);
                this.newList = this.oldList.slice();
                this.$nextTick(() => {
                    this.setSort()
                })
            })
        },
        setSort() {
            const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
            this.sortable = Sortable.create(el, {
                ghostClass: 'sortable-ghost', // class name 占位符
                setData: function (dataTransfer) {
                    // 避免 Firefox bug
                    dataTransfer.setData('Text', '')
                },
                onEnd: evt => {
                    const targetRow = this.list.splice(evt.oldIndex, 1)[0]
                    this.list.splice(evt.newIndex, 0, targetRow)

                    const tempIndex = this.newList.splice(evt.oldIndex, 1)[0]
                    this.newList.splice(evt.newIndex, 0, tempIndex)
                }
            })
        }
    },
    filters: {
        statusFilter(status) {
            const statusMap = {
                published: 'success',
                draft: 'info',
                deleted: 'danger'
            }
            return statusMap[status]
        }
    }
}
</script>

<style>
.sortable-ghost {
    opacity: .8;
    color: #fff !important;
    background-color: #42b983 !important;
}
</style>

<style lang="scss" scoped>
.icon-star {
    margin-right: 2px;
}
.drag-handler {
    width: 20px;
    height: 20px;
    cursor: pointer;
}
.show-d {
    margin-top: 15px;
}
</style>

