<template>
    <div :class="className" :id="id" :style="{height: height, width: width}"></div>
</template>

<script>
import echarts from 'echarts'
import resize from './mixnis/resize'

export default {
    mixins: [resize], // 自适应屏幕宽度
    props: {
        className: {
            type: String,
            default: 'chart'
        },
        id: {
            type: String,
            default: 'chart'
        },
        width: {
            type: String,
            default: '200px'
        },
        height: {
            type: String,
            default: '200px'
        }
    },
    data() {
        return {
            chart: null
        }
    },
    mounted() { // 挂载结束
        this.initChart()
    },
    methods: {
        initChart() {
            this.chart = echarts.init(document.getElementById(this.id));

            const xData = (function() {
                const data = [];
                for (let i = 1; i < 13; i++) {
                    data.push(i + 'month')
                }
                return data;
            }())
            
            this.chart.setOption({
                backgroundColor: '#344b58',
                title: {
                    text: 'statistics',
                    top: 20,
                    x: 20,
                    textStyle: {
                        fontSize: 22,
                        color: '#fff'
                    },
                    subtextStyle: {
                        color: '#90979c',
                        fontSize: 16
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        lineStyle: {
                            color: '#fff'
                        }
                    }
                },
                legend: { // 图例列表
                    x: '5%',
                    top: '10%',
                    textStyle: {
                        color: '#90979c'
                    },
                    data: ['female', 'male', 'average']
                },
                grid: {
                    top: 110,
                    bottom: 95,
                    // 下面两个没发现啥用
                    borderWidth: 0,
                    textStyle: {
                        color: '#fff'
                    }
                },
                calculable: true, // 并没有此属性，不知道干嘛用的
                xAxis: [
                    {
                        type: 'category',
                        axisLine: {
                            lineStyle: {
                                color: '#90979c'
                            }
                        },
                        splitLine: { // 分割线
                            show: false
                        },
                        axisTick: {
                            show: false // 是否显示刻度
                        },
                        axisLabel: {
                            interval: 0 // 显示所有标签
                        },
                        data: xData
                    }
                ],
                yAxis: {
                    type: 'value',
                    axisLine: { // 是否显示坐标轴轴线
                        lineStyle: {
                            color: '#90979c'
                        }
                    },
                    axisLabel: {
                        interval: 0 // 显示所有标签
                    },
                    splitLine: { // 分割线
                        show: false
                    },
                    axisTick: { // 是否显示刻度
                        show: false
                    }
                },
                dataZoom: [
                    {
                        type: 'slider',
                        show: true,
                        height: 30,
                        xAxisIndex: [0],
                        bottom: 30,
                        start: 10,
                        end: 80,
                        handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                        handleSize: '110%',
                        handleStyle: {
                            color: '#d3dee5'
                        },
                        textStyle: {
                            color: '#fff'
                        },
                        borderColor: '#90979c'
                    },
                    {
                        type: 'inside',
                        show: true,
                        height: 15,
                        start: 1,
                        end: 35
                    }
                ],
                series: [
                    {
                        type: 'bar',
                        name: 'female',
                        stack: 'total',
                        barMaxWidth: 35,
                        barGap: '10%',
                        itemStyle: {
                            normal: {
                                color: 'rgba(255,144,128,1)',
                                label: {
                                    show: true,
                                    textStyle: {
                                        color: '#fff'
                                    },
                                    position: 'insideTop',
                                    formatter(p) {
                                        return p.value > 0 ? p.value : ''
                                    }
                                }
                            }
                        },
                        data: [709, 1917, 2455, 2610, 1719, 1433, 1544, 3285, 5208, 3372, 2484, 4078]
                    },
                    {
                        type: 'bar',
                        name: 'male',
                        stack: 'total',
                        itemStyle: {
                            normal: {
                                color: 'rgba(0,191,183,1)',
                                barBorderRadius: 0,
                                label: {
                                    show: true,
                                    position: 'top',
                                    formatter(p) {
                                        return p.value > 0 ? p.value : ''
                                    }
                                }
                            }
                        },
                        data: [327, 1776, 507, 1200, 800, 482, 204, 1390, 1001, 951, 381, 220]
                    },
                    {
                        type: 'line',
                        name: 'average',
                        stack: 'total',
                        symbolSize: 10,
                        symbol: 'circle',
                        itemStyle: {
                            normal: {
                                color: 'rgba(252,230,48,1)',
                                barBorderRadius: 0,
                                label: {
                                    show: true,
                                    position: 'top',
                                    formatter(p) {
                                        return p.value > 0 ? p.value : ''
                                    }
                                }
                            }
                        },
                        data: [1036, 3693, 2962, 3810, 2519, 1915, 1748, 4675, 6209, 4323, 2865, 4298]
                    }
                ]
            })
        }
    },
    beforeDestroy() {
        if (!this.chart) {
            return
        }
        this.chart.dispose()
        this.chart = null
    }
}
</script>

