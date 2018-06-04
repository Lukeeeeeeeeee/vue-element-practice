<template>
    <div :class="className" :style="{height: height, width: width}"></div>
</template>
<script>
import echarts from 'echarts'
require('echarts/theme/macarons')
import { debounce } from '@/utils' // echarts屏幕自适应

const animationDuration = 6000

export default {
    props: {
        className: {
            type: String,
            default: 'chart'
        },
        width: {
            type: String,
            default: '100%'
        },
        height: {
            type: String,
            default: '300px'
        }
    },
    data() {
        return {
            chart: null
        }
    },
    mounted() {
        this.initChart()
        // 屏幕自适应
        this.__resizeHandler = debounce(() => {
            if (this.chart) {
                this.chart.resize()
            }
        })
        window.addEventListener('resize', this.__resizeHandler)
    },
    methods: {
        initChart() {
            this.chart = echarts.init(this.$el, 'macarons')

            this.chart.setOption({
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    top: 10,
                    left: '2%',
                    right: '2%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [{
                    type: 'category',
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    axisTick: { // 坐标轴刻度相关设置
                        alignWithLabel: true
                    }
                }],
                yAxis: [{
                    type: 'value',
                    axisTick: { // 坐标轴刻度相关设置
                        show: false // 是否显示坐标轴刻度
                    }
                }],
                series: [{
                    name: 'pageA',
                    type: 'bar',
                    stack: 'vistors',
                    barWidth: '60%',
                    data: [79, 52, 200, 334, 390, 330, 220],
                    animationDuration
                }, {
                    name: 'pageB',
                    type: 'bar',
                    stack: 'vistors',
                    barWidth: '60%',
                    data: [80, 52, 200, 334, 390, 330, 220],
                    animationDuration
                }, {
                    name: 'pageC',
                    type: 'bar',
                    stack: 'vistors',
                    barWidth: '60%',
                    data: [30, 52, 200, 334, 390, 330, 220],
                    animationDuration
                }]
            })
        }
    },
    beforeDestroy() {
        if (!this.chart) {
            return
        }
        window.removeEventListener('resize', this.__resizeHandler)
        this.chart.dispose()
        this.chart = null
    }
}
</script>
