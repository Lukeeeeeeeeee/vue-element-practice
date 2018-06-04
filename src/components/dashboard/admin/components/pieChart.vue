<template>
    <div :class="className" :style="{height: height, width: width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons')
import { debounce } from '@/utils' // echarts屏幕自适应

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
                // 饼图、仪表盘、漏斗图: {a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
                tooltip: { // 提示框组件
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                legend: { // 图例组件
                    left: 'center', // 图例组件离容器左侧的距离
                    bottom: '10',
                    data: ['Industries', 'Technology', 'Forex', 'Gold', 'Forecasts']
                },
                // 是否显示拖拽用的手柄（手柄能拖拽调整选中范围）
                // 没发现有啥用，单项配置中并无此属性
                // calculable: true, 
                series: [{
                    type: 'pie',
                    name: 'WEEKLY WRITE ARTICLES',
                    roseType: 'radius',
                    center: ['50%', '38%'],
                    radius: [15, 95],
                    data: [
                        { value: 320, name: 'Industries' },
                        { value: 240, name: 'Technology' },
                        { value: 149, name: 'Forex' },
                        { value: 100, name: 'Gold' },
                        { value: 59, name: 'Forecasts' }
                    ],
                    animationEasing: 'cubicInOut',
                    animationDuration: 2600
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
