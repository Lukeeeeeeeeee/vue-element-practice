<template>
    <!-- 
        show-overflow-tooltip   当内容过长被隐藏时显示 tooltip
        slot-scope  作用域插槽
     -->
    <el-table :data="list" height="402" style="width: 100%;">
        <el-table-column label="Order_No" show-overflow-tooltip>
            <template slot-scope="scope">{{scope.row.order_no}}</template>
        </el-table-column>

        <el-table-column label="Price" width="195" align="center">
            <template slot-scope="scope">￥{{scope.row.price | toThousandslsFilter}}</template>
        </el-table-column>

        <el-table-column label="Status" width="100" align="center">
            <template slot-scope="scope">
                <el-tag :type="scope.row.status | statusFilter">{{scope.row.status}}</el-tag>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
import { fetchList } from '@/api/transaction'

export default {
    filters: {
        statusFilter(status) {
            const statusMap = {
                success: 'success',
                pending: 'danger'
            }
            return statusMap[status]
        }
    },
    data() {
        return {
            list: null
        }
    },
    created() {
        this.fetchData()
    },
    methods: {
        fetchData() {
            fetchList().then(response => {
                this.list = response.data.items
            })
        }
    }
}
</script>


