<template>
    <div class="dashboard-admin-container">
        <panel-group></panel-group>
        <el-row style="background-color: #fff; padding: 16px 16px 0; margin-bottom: 32px;">
            <line-chart :chart-data="lineChartData"></line-chart>
        </el-row>
    </div>
</template>

<script>
import PanelGroup from './components/panelGroup'
import LineChart from './components/lineChart'

const lineChartData = {
    newVisitis: {
        expectedData: [100, 120, 161, 134, 105, 160, 165],
        actualData: [120, 82, 91, 154, 162, 140, 145]
    }
}

export default {
    name: 'admin-dashboard',
    components: {
        PanelGroup,
        LineChart
    },
    data() {
        return {
            lineChartData: lineChartData.newVisitis
        }
    }
}
</script>

<style lang="scss" scoped>
.dashboard-admin-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);

}
</style>

