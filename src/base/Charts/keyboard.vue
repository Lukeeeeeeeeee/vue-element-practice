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

            const xAxisData = [];
            const data = [];
            const data2 = [];
            for (let i = 0; i < 50; i++) {
                xAxisData.push(i);
                data.push((Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5);
                data2.push((Math.sin(i / 5) * (i / 5 + 10) + i / 6) * 3);
            }
            
            this.chart.setOption({
                backgroundColor: '#08263a',
                xAxis: [
                    {
                        show: false,
                        data: xAxisData
                    }, 
                    {
                        show: false,
                        data: xAxisData
                    }
                ],
                yAxis: {
                    axisLine: { // 是否显示刻度标签
                        show: false
                    },
                    axisLabel: {
                        textStyle: { // 刻度标签文字颜色
                            color: '#4a657a'
                        }
                    },
                    splitLine: { // 分割线
                        show: true,
                        lineStyle: {
                            color: '#08263f'
                        }
                    },
                    axisTick: { // 是否显示刻度
                        show: false
                    }
                },
                visualMap: {
                    show: false,
                    min: 0,
                    max: 50,
                    dimension: 0,
                    inRange: {
                        color: ['#4a657a', '#308e92', '#b1cfa5', '#f5d69f', '#f5898b', '#ef5055']
                    }
                },
                series: [
                    {
                        type: 'bar',
                        name: 'back',
                        data: data2,
                        z: 1,
                        itemStyle: {
                            normal: {
                                opacity: 0.4,
                                barBorderRadius: 5,
                                shadowBlur: 3,
                                shadowColor: '#111'
                            }
                        }
                    },
                    {
                        type: 'line',
                        name: 'Simulate Shadow',
                        data: data,
                        z: 2,
                        showSymbol: false,
                        animationDuration: 1200,
                        animationDelay: 0,
                        animationEasing: 'linear',
                        lineStyle: {
                            normal: {
                                color: 'transparent'
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: '#08263a',
                                shadowColor: '#000',
                                shadowBlur: 50
                            }
                        }
                    },
                    {
                        type: 'bar',
                        name: 'front',
                        data: data,
                        xAxisIndex: 1,
                        z: 3,
                        itemStyle: {
                            normal: {
                                barBorderRadius: 5
                            }
                        },
                        animationEasing: 'elasticOut',
                        animationEasingUpdate: 'elasticOut',
                        animationDelay(idx) {
                            return idx * 20
                        },
                        animationDelayUpdate(idx) {
                            return idx * 20
                        }
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
