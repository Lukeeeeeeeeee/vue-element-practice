<template>
    <div class="dashboard-admin-container">
        <panel-group @handleSetLineChartData="handleSetLineChartData"></panel-group>
        <!-- 直线图 -->
        <el-row style="background-color: #fff; padding: 16px 16px 0; margin-bottom: 32px;">
            <line-chart :chart-data="lineChartData"></line-chart>
        </el-row>
        <!-- 
            gutter  栅格间隔
         -->
        <el-row :gutter="32">
            <el-col :xs="24" :sm="24" :lg="8">
                <div class="chart-wrapper">
                    <raddar-chart></raddar-chart>
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :lg="8">
                <div class="chart-wrapper">
                    <pie-chart></pie-chart>
                </div>
            </el-col>
            <el-col :xs="24" :sm="24" :lg="8">
                <div class="chart-wrapper">
                    <bar-chart></bar-chart>
                </div>
            </el-col>
        </el-row>

        <el-row :gutter="8">
            <el-col :xs="24" :sm="24" :md="24" :lg="12" :xl="12" style="margin-bottom: 30px; padding-right: 8px;">
                <transaction-table></transaction-table>
            </el-col>
            <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="5">
                <todo-list></todo-list>
            </el-col>
            <el-col :xs="12" :sm="12" :md="12" :lg="6" :xl="5">
                <box-card></box-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import PanelGroup from './components/panelGroup'
import LineChart from './components/lineChart'
import RaddarChart from './components/raddarChart'
import PieChart from './components/pieChart'
import BarChart from './components/barChart'
import TransactionTable from './components/transactionTable'
import TodoList from './components/todoList'
import BoxCard from './components/boxCard'

const lineChartData = {
    newVisitis: {
        expectedData: [100, 120, 161, 134, 105, 160, 165],
        actualData: [120, 82, 91, 154, 162, 140, 145]
    },
    messages: {
        expectedData: [200, 192, 120, 144, 160, 130, 140],
        actualData: [180, 160, 151, 106, 145, 150, 130]
    },
    purchases: {
        expectedData: [80, 100, 121, 104, 105, 90, 100],
        actualData: [120, 90, 100, 138, 142, 130, 130]
    },
    shoppings: {
        expectedData: [130, 140, 141, 142, 145, 150, 160],
        actualData: [120, 82, 91, 154, 162, 140, 130]
    }
}

export default {
    name: 'admin-dashboard',
    components: {
        PanelGroup,
        LineChart,
        RaddarChart,
        PieChart,
        BarChart,
        TransactionTable,
        TodoList,
        BoxCard
    },
    data() {
        return {
            lineChartData: lineChartData.newVisitis
        }
    },
    methods: {
        handleSetLineChartData(type) {
            this.lineChartData = lineChartData[type]
        }
    }
}
</script>

<style lang="scss" scoped>
.dashboard-admin-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    .chart-wrapper {
        background-color: #fff;
        padding: 16px 16px 0;
        margin-bottom: 32px;
    }
}
</style>

