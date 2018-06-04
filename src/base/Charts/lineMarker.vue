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
            
            this.chart.setOption({
                backgroundColor: '#394056',
                title: {
                    top: 20,
                    text: 'Requests',
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: 16,
                        color: '#f1f1f3'
                    },
                    left: '1%'
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        lineStyle: {
                            color: '#576178'
                        }
                    }
                },
                legend: { // 图例列表
                    top: 20,
                    icon: 'rect',
                    itemWidth: 14,
                    itemHeight: 5,
                    itemGap: 13,
                    data: ['CMCC', 'CTCC', 'CUCC'],
                    right: '4%',
                    textStyle: {
                        fontSize: 12,
                        color: '#f1f1f3'
                    }
                },
                grid: {
                    top: 100,
                    left: '3%',
                    right: '3%',
                    bottom: '2%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        boundaryGap: false,
                        axisLine: {
                            lineStyle: {
                                color: '#57617b'
                            }
                        },
                        data: ['13:00', '13:05', '13:10', '13:15', '13:20', '13:25', '13:30', '13:35', '13:40', '13:45', '13:50', '13:55']
                    }
                ],
                yAxis: {
                    type: 'value',
                    name: '(%)',
                    axisLine: { // 是否显示刻度标签
                        show: false
                    },
                    axisLabel: {
                        textStyle: { // 刻度标签文字颜色
                            color: '#4a657a'
                        }
                    },
                    splitLine: { // 分割线
                        lineStyle: {
                            color: '#57617B'
                        }
                    },
                    axisTick: { // 是否显示刻度
                        show: false
                    }
                },
                series: [
                    {
                        type: 'line',
                        name: 'CMCC',
                        smooth: true, // 是否显示平滑曲线
                        symbol: 'circle',
                        symbolSize: 5,
                        showSymbol: false,
                        lineStyle: {
                            normal: {
                                width: 1
                            }
                        },
                        areaStyle: { // 区域填充色
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: 'rgba(137, 189, 27, 0.3)'
                                    },
                                    {
                                        offset: 0.8,
                                        color: 'rgba(137, 189, 27, 0)'
                                    }
                                ], false),
                                shadowColor: 'rgba(0, 0, 0, 0.1)',
                                shadowBlur: 10
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: 'rgb(137,189,27)',
                                borderColor: 'rgba(137,189,27,0.2)',
                                borderWidth: 12
                            }
                        },
                        data: [220, 182, 191, 134, 150, 120, 110, 125, 145, 122, 165, 122]
                    },
                    {
                        type: 'line',
                        name: 'CTCC',
                        smooth: true, // 是否显示平滑曲线
                        symbol: 'circle',
                        symbolSize: 5,
                        showSymbol: false,
                        lineStyle: {
                            normal: {
                                width: 1
                            }
                        },
                        areaStyle: { // 区域填充色
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: 'rgba(0, 136, 212, 0.3)'
                                    },
                                    {
                                        offset: 0.8,
                                        color: 'rgba(0, 136, 212, 0)'
                                    }
                                ], false),
                                shadowColor: 'rgba(0, 0, 0, 0.1)',
                                shadowBlur: 10
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: 'rgb(0,136,212)',
                                borderColor: 'rgba(0,136,212,0.2)',
                                borderWidth: 12
                            }
                        },
                        data: [120, 110, 125, 145, 122, 165, 122, 220, 182, 191, 134, 150]
                    },
                    {
                        type: 'line',
                        name: 'CUCC',
                        smooth: true, // 是否显示平滑曲线
                        symbol: 'circle',
                        symbolSize: 5,
                        showSymbol: false,
                        lineStyle: {
                            normal: {
                                width: 1
                            }
                        },
                        areaStyle: { // 区域填充色
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                                    {
                                        offset: 0,
                                        color: 'rgba(219, 50, 51, 0.3)'
                                    },
                                    {
                                        offset: 0.8,
                                        color: 'rgba(219, 50, 51, 0)'
                                    }
                                ], false),
                                shadowColor: 'rgba(0, 0, 0, 0.1)',
                                shadowBlur: 10
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: 'rgb(219,50,51)',
                                borderColor: 'rgba(219,50,51,0.2)',
                                borderWidth: 12
                            }
                        },
                        data: [220, 182, 125, 145, 122, 191, 134, 150, 120, 110, 165, 122]
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

