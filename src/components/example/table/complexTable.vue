<template>
    <div class="app-container calendar-list-container">
        <!-- 搜索栏 -->
        <div class="filter-container">
            <el-input @keyup.enter.native="handleFilter" v-model="listQuery.title" 
                style="width: 200px;" class="filter-item" placeholder="标题">
            </el-input>
            <el-select v-model="listQuery.importance" clearable class="filter-item" style="width: 90px" placeholder="重要性">
                <el-option v-for="item in importanceOptions" :key="item" :label="item" :value="item">
                </el-option>
            </el-select>
            <el-select v-model="listQuery.type" 
                clearable class="filter-item" style="width: 130px" placeholder="类型">
                <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name+'('+item.key+')'" :value="item.key">
                </el-option>
            </el-select>
            <el-select @change="handleFilter" v-model="listQuery.sort" style="width: 140px" class="filter-item">
                <el-option v-for="item in sortOptions" :key="item.key" :label="item.label" :value="item.key">
                </el-option>
            </el-select>
            <el-button @click="handleFilter" class="filter-item" type="primary" icon="el-icon-search">搜索</el-button>
            <el-button @click="handleCreate" class="filter-item" type="primary" icon="el-icon-edit" style="margin-left: 10px">添加</el-button>
            <el-button @click="handleDownload" :loading="downloadLoading" class="filter-item" type="primary" icon="el-icon-download">导出</el-button>
            <!-- el-checkbox 选中后会修改showReviewer状态(很神奇,没明白其中的道理) -->
            <el-checkbox class="filter-item" style="margin-left: 15px" @change="tableKey=tableKey+1" v-model="showReviewer">审核人</el-checkbox>    
        </div>
        <!-- end -->

        <!-- content -->
        <!-- key    保证table重新渲染 -->
        <el-table :key="tableKey" :data="list" v-loading="listLoading" 
            element-loading-text="给我一点时间"
            border fit highlight-current-row style="width: 100%">

            <el-table-column align="center" label="ID" width="65">
                <template slot-scope="scope">
                    <span>{{scope.row.id}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="日期" width="150">
                <template slot-scope="scope">
                    <span>{{scope.row.timestamp | parseTime('{y}-{m}-{d} {h}:{i}')}}</span>
                </template>
            </el-table-column>
            <el-table-column label="标题" min-width="150">
                <template slot-scope="scope">
                    <span class="link-type">{{scope.row.title}}</span>
                    <el-tag>{{scope.row.type | typeFilter}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" label="作者" width="110">
                <template slot-scope="scope">
                    <span>{{scope.row.author}}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="审核人" width="110" v-if="showReviewer">
                <template slot-scope="scope">
                    <span style="color: red">{{scope.row.reviewer}}</span>
                </template>
            </el-table-column>
            <el-table-column label="重要性" width="80">
                <template slot-scope="scope">
                    <svg-icon icon-class="star" class="meta-item__icon" v-for="n in +scope.row.importance" :key="n" />
                </template>
            </el-table-column>
            <el-table-column align="center" label="阅读数" width="95">
                <template slot-scope="scope">
                    <span class="link-type" v-if="scope.row.pageviews">{{scope.row.pageviews}}</span>
                    <span v-else>0</span>
                </template>
            </el-table-column>
            <el-table-column align="center" label="状态" width="100" class-name="status-col">
                <template slot-scope="scope">
                    <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column align="center" label="操作" width="230" class-name="small-padding fixed-width">
                <template slot-scope="scope">
                    <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">编辑</el-button>
                    <el-button type="success" size="mini" v-if="scope.row.status != 'published'" @click="handleModifyStatus(scope.row, 'published')">发布</el-button>
                    <el-button size="mini" v-if="scope.row.status != 'draft'" @click="handleModifyStatus(scope.row, 'draft')">草稿</el-button>
                    <el-button type="danger" size="mini" v-if="scope.row.status != 'deleted'" @click="handleModifyStatus(scope.row, 'deleted')">删除</el-button>
                </template>
            </el-table-column>

        </el-table>
        <!-- end -->

        <!-- 分页 -->
        <div class="pagination-container">
            <el-pagination background 
                @current-change="handleCurrentChange" @size-change="handleSizeChange"
                :current-page="listQuery.page" :page-size="listQuery.limit"
                :page-sizes="[10, 20, 30, 50]" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
        </div>
        <!-- end -->

        <!-- dialog对话框 -->
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
            <el-form :model="temp" :rules="rules" ref="dataForm" label-position="left" label-width="70px" style="width: 400px; margin-left: 50px;">
                <el-form-item label="类型" prop="type">
                    <el-select class="filter-item" v-model="temp.type" placeholder="请选择">
                        <el-option v-for="item in calendarTypeOptions" :key="item.key" :label="item.display_name" :value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="时间" prop="timestamp">
                    <el-date-picker v-model="temp.timestamp" type="datetime" placeholder="请选择时间">
                    </el-date-picker>
                </el-form-item>
                <el-form-item label="标题" prop="title">
                    <el-input v-model="temp.title"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select class="filter-item" v-model="temp.status" placeholder="请选择">
                        <el-option v-for="item in statusOptions" :key="item" :label="item" :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="重要性">
                    <el-rate v-model="temp.importance" :colors="['#99A9BF', '#F7BA2A', '#FF9900']" :max="3">
                    </el-rate>
                </el-form-item>
                <el-form-item label="点评">
                    <el-input v-model="temp.remark" type="textarea" :autosize="{minRows: 2, maxRows: 6}" placeholder="请输入">
                    </el-input>
                </el-form-item>
            </el-form>
            <div class="dialog-footer" slot="footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button @click="createData" v-if="dialogStatus == 'create'" type="primary">确定</el-button>
                <el-button @click="updateData = false" v-else type="primary">确定</el-button>                
            </div>
        </el-dialog>
        <!-- end -->
    </div>
</template>

<script>
import { fetchList, createArticle } from '@/api/article'
import { parseTime } from '@/filters'

const calendarTypeOptions = [
    { key: 'CN', display_name: 'China' },
    { key: 'US', display_name: 'USA' },
    { key: 'JP', display_name: 'Japan' },
    { key: 'EU', display_name: 'Eurozone' }
]

// Array to Obj, E.g: { CN: "China", US: "USA"}
//                                                  运行原理
//                  acc               |               cur                   |  result
// {}                                 |{key: 'CN', display_name: 'China'}   |{CN: 'China'}
// {CN: 'China'}                      |{key: 'US', display_name: 'USA'}     |{CN: 'China', US: 'USA'}
// {CN: 'China', US: 'USA'}           |{key: 'JP', display_name: 'Japan'}   |{CN: 'China', US: 'USA', JP: 'Japan'}
// {CN: 'China', US: 'USA', JP: 'Japan'}|{key: 'EU', display_name: 'Eurozone'}|{CN: 'China', US: 'USA', JP: 'Japan', EU: 'Eurozone'}
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name
    return acc
}, {})

export default {
    name: 'complexTable',
    data() {
        return {
            tableKey: 0,
            importanceOptions: [1, 2, 3],
            calendarTypeOptions,
            listQuery: {
                importance: undefined,
                type: undefined,
                sort: '+id',
                page: 1,
                limit: 20
            },
            sortOptions: [{ label: '正序', key: '+id' }, { label: '倒序', key: '-id' }],
            list: null,
            listLoading: true,
            showReviewer: false,
            total: null,
            temp: {
                id: undefined,
                importance: 1,
                remark: '',
                timestamp: new Date(),
                title: '',
                type: '',
                status: 'published'
            },
            dialogStatus: '',
            textMap: {
                update: 'Edit',
                create: 'Create'
            },
            rules: {
                type: [{required: true, message: '请选择类型', trigger: 'change'}],
                timestamp: [{required: true, message: '请选择时间', trigger: 'change'}],
                title: [{required: true, message: '请填写标题', trigger: 'blur'}]
            },
            statusOptions: ['published', 'draft', 'deleted'],
            dialogFormVisible: false,
            downloadLoading: false
        }
    },
    created() {
        this.getList()
    },
    methods: {
        getList() {
            fetchList(this.listQuery).then(response => {
                // console.log(response)
                this.listLoading = true
                this.list = response.data.items
                this.total = response.data.total
                this.listLoading = false
            })
        },
        handleCurrentChange(val) {
            this.listQuery.page = val
            this.getList()
        },
        handleSizeChange(val) {
            this.listQuery.limit = val
            this.getList()
        },
        handleFilter() {
            this.listQuery.page = 1
            this.getList()
        },
        resetTemp() {
            this.temp = {
                id: undefined,
                importance: 1,
                remark: '',
                timestamp: new Date(),
                title: '',
                type: '',
                status: 'published'
            }
        },
        handleCreate() {
            this.resetTemp()
            this.dialogStatus = 'create'
            this.dialogFormVisible = true

        },
        createData() {
            this.$refs['dataForm'].validate((valid) => {
                // console.log(valid)
                if (valid) {
                    this.temp.id = parseInt(Math.random() * 100) + 1024
                    this.temp.author = 'vue-element-admin'
                    createArticle(this.temp).then(() => {
                        // console.log(response)
                        this.list.unshift(this.temp)
                        this.dialogFormVisible = false
                        this.$notify({
                            title: '成功',
                            message: '创建成功',
                            type: 'success',
                            duration: 2000
                        })
                    })
                }
            })
        },
        handleDownload() {
            this.downloadLoading = true
            import('@/vendor/Export2Excel').then(excel => {
                // console.log(excel)
                // xlsx Header
                const tHeader = ['时间', '标题', '类型', '重要性', '状态']
                const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
                const data = this.formatJson(filterVal, this.list)
                excel.export_json_to_excel({
                    header: tHeader,
                    data,
                    filename: 'table-list'
                })
                this.downloadLoading = false
            })
        },
        formatJson(filterVal, jsonData) {
            return jsonData.map(v => filterVal.map(j => {
                if (j === 'timestamp') {
                    return parseTime(v[j])
                } else {
                    return v[j]
                }
            }))
        },
        updateData() {

        },
        handleUpdate(row) {
            // console.log(row)
            this.temp = Object.assign({}, row)
            this.temp.timestamp = new Date(this.temp.timestamp)
            this.dialogStatus = 'update'
            this.dialogFormVisible = true
            this.$nextTick(() => {
                this.$refs['dataForm'].clearValidate()
            })
        },
        handleModifyStatus(row, status) {
            this.$message({
                message: '操作成功',
                type: 'success'
            })
            row.status = status
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
        },
        typeFilter(type) {
            return calendarTypeKeyValue[type]
        }
    }
}
</script>

<style lang="scss" scoped>

</style>

