<template>
    <div class="app-container calendat-list-container">
        <el-table :data="list" v-loading.body="listLoading" border fit highlight-current-row style="width: 100%;">

            <el-table-column align="center" label="ID" width="80">
                <template slot-scope="scope">
                    <span>{{scope.row.id}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="Date" width="180">
                <template slot-scope="scope">
                    <span>{{scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="Author" width="120">
                <template slot-scope="scope">
                    <span>{{scope.row.author}}</span>
                </template>
            </el-table-column>

            <el-table-column label="Importance" width="100">
                <template slot-scope="scope">
                    <svg-icon v-for="n in +scope.row.importance" :key="n" icon-class="star" class="meta-item__icon" />
                </template>
            </el-table-column>

            <el-table-column class-name="status-col" label="Status" width="110">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
                </template>
            </el-table-column>

            <el-table-column label="Title" min-width="80">
                <template slot-scope="scope">
                    <template v-if="scope.row.edit">
                        <el-input class="edit-input" size="small" v-model="scope.row.title"></el-input>
                        <el-button class="cancel-btn" size="small" icon="el-icon-refresh" type="wraning" @click="cancelEdit(scope.row)">cancel</el-button>
                    </template>
                    <span v-else>{{scope.row.title}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center" label="Actions" width="120">
                <template slot-scope="scope">
                    <el-button v-if="scope.row.edit" type="success" @click="confirmEdit(scope.row)" size="small" icon="el-icon-circle-check-outline">Ok</el-button>
                    <el-button v-else type="primary" @click='scope.row.edit=!scope.row.edit' size="small" icon="el-icon-edit">Edit</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { fetchList } from '@/api/article';
export default {
    name: 'inlineEditTable',
    data() {
        return {
            listQuery: {
                page: 1,
                limit: 10
            },
            listLoading: true,
            list: null
        }
    },
    created() {
        this.getList()
    },
    methods: {
        getList() {
            this.listLoading = true;
            fetchList(this.listQuery).then((response) => {
                const items = response.data.items;
                this.list = items.map(v => {
                    this.$set(v, 'edit', false);

                    v.originalTitle = v.title;

                    return v;
                })
                this.listLoading = false;
            })
        },
        // 未修改|还原
        cancelEdit(row) {
            row.title = row.originalTitle;
            row.edit = false;
            this.$message({
                message: '已恢复到初始值',
                type: 'wraning'
            })
        },
        // 修改完成
        confirmEdit(row) {
            row.originalTitle = row.title;
            row.edit = false;
            this.$message({
                message: '修改成功',
                type: 'success'
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

<style lang="scss" scoped>
.edit-input {
    padding-right: 100px;
}
.cancel-btn {
    position: absolute;
    right: 15px;
    top: 10px;
}
</style>

