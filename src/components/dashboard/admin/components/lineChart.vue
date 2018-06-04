<template>
    <div :class="className" :style="{height: height, width: width}"></div>
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons')
import { debounce } from '@/utils'; // echarts自适应

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
            default: '350px'
        },
        autoResize: {
            type: Boolean,
            default: true
        },
        chartData: {
            type: Object
        }
    },
    data() {
        return {
            chart: null
        }
    },
    mounted() {
        this.initChart()
        if (this.autoResize) {
            this.__resizeHanlder = debounce(() => {
                if (this.chart) {
                    this.chart.resize()
                }
            }, 100)
            window.addEventListener('resize', this.__resizeHanlder)
        }
    },
    methods: {
        initChart() {
            this.chart = echarts.init(this.$el, 'macarons')
            this.setOptions(this.chartData)
        },
        setOptions({ expectedData, actualData } = {}) {
            this.chart.setOption({
                xAxis: {
                    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    boundaryGap: false, // 防止两端有间距
                    axisTick: {
                        show: false // 是否显示刻度
                    }
                },
                yAxis: {
                    axisTick: {
                        show: false // 是否显示刻度
                    }
                },
                grid: {
                    left: 10,
                    right: 10,
                    bottom: 20,
                    top: 30,
                    containLabel: true // 防止标签溢出
                },
                tooltip: { // 提示框组件
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross'
                    },
                    padding: [5, 10]
                },
                legend: {
                    data: ['expected', 'actual']
                },
                series: [{
                    type: 'line',
                    name: 'expected',
                    itemStyle: {
                        normal: {
                            color: '#FF005A',
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: '#FF005A',
                            width: 2
                        }
                    },
                    smooth: true, // 是否平滑曲线显示
                    data: expectedData,
                    animationDuration: 2800,
                    animationEasing: 'cubicInOut'
                },
                {
                    type: 'line',
                    name: 'actual',
                    smooth: true,
                    itemStyle: {
                        normal: {
                            color: '#3888fa'
                        }
                    },
                    lineStyle: {
                        normal: {
                            color: '#3888fa',
                            width: 2
                        }
                    },
                    areaStyle: {
                        normal: {
                            color: '#f3f8ff' // 填充颜色
                        }
                    },
                    data: actualData,
                    animationDuration: 2800,
                    animationEasing: 'quadraticOut'
                }]
            })
        }
    },
    watch: {
        chartData: {
            deep: true,
            handler(val) {
                this.setOptions(val)
            }
        }
    },
    beforeDestroy() {
        if (!this.chart) {
            return
        }
        if (this.autoResize) {
            window.removeEventListener('resize', this.__resizeHanlder)
        }

        const sidebarElm = document.getElementsByClassName('sidebar-container')[0]
        sidebarElm.removeEventListener('transitioned', this.__resizeHanlder)

        this.chart.dispose()
        this.chart = null
    }
}
</script>

