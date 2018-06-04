<template>
    <div :class="className" :style="{height: height, width: width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons')
import { debounce } from '@/utils' // echarts屏幕自适应

const animationDuration = 3000

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
                // 提示框组件
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                // 雷达图
                radar: {
                    radius: '66%', // 半径
                    center: ['50%', '42%'], // 中心（圆心）坐标，数组的第一项是横坐标，第二项是纵坐标
                    splitNumber: 8, // 指示器轴的分割段数
                    splitArea: {
                        areaStyle: { // 分隔区域的样式设置
                            color: 'rgba(127, 95, 132, .3)',
                            shadowBlur: 45,
                            shadowColor: 'rgba(0, 0, 0, .5)',
                            shadowOffsetX: 0,
                            shadowOffsetY: 15,
                            opacity: 1
                        }
                    },
                    indicator: [ // 雷达图的指示器，用来指定雷达图中的多个变量（维度）
                        { name: 'Sales', max: 10000 },
                        { name: 'Administration', max: 20000 },
                        { name: 'Information Techology', max: 20000 },
                        { name: 'Customer Support', max: 20000 },
                        { name: 'Development', max: 20000 },
                        { name: 'Marketing', max: 20000 }
                    ]
                },
                legend: {
                    left: 'center',
                    bottom: '10',
                    data: ['Allocated Budget', 'Expected Spending', 'Actual Spending']
                },
                series: [{
                    type: 'radar',
                    symbolSize: 0,
                    areaStyle: { // 区域填充样式
                        normal: {
                            shadowBlur: 13,
                            shadowColor: 'rgba(0, 0, 0, .2)',
                            shadowOffsetX: 0,
                            shadowOffsetY: 10,
                            opacity: 1
                        }
                    },
                    data: [
                        {
                        value: [5000, 7000, 12000, 11000, 15000, 14000],
                        name: 'Allocated Budget'
                        },
                        {
                        value: [4000, 9000, 15000, 15000, 13000, 11000],
                        name: 'Expected Spending'
                        },
                        {
                        value: [5500, 11000, 12000, 15000, 12000, 12000],
                        name: 'Actual Spending'
                        }
                    ],
                    animationDuration: animationDuration // 初始动画的时长
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

